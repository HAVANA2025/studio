
'use server';
import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import type {UserRecord} from "firebase-functions/v1/auth";
import {Resend} from "resend";
import { adminEmails } from './adminEmails';

admin.initializeApp();
const auth = admin.auth();
const db = admin.firestore();

const RESEND_API_KEY = functions.config().resend?.apikey;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

if (!resend) {
    functions.logger.error("Resend API key is not configured. Cannot send welcome emails.");
}

/**
 * A callable function for admins to create a new user.
 * This function is responsible for creating the user in Firebase Auth and setting custom claims.
 * The actual welcome email is sent by the `sendWelcomeEmail` trigger function.
 */
export const addUser = functions.https.onCall(async (data, context) => {
    // Check if the user calling the function is an admin.
    if (!context.auth || !adminEmails.includes(context.auth.token.email || '')) {
        throw new functions.https.HttpsError('permission-denied', 'Only admins can create new users.');
    }

    const { email, displayName, role } = data;
    
    if (!email || !displayName || !role) {
         throw new functions.https.HttpsError('invalid-argument', 'Please provide email, displayName, and role.');
    }

    try {
        const userRecord = await auth.createUser({
            email,
            displayName,
        });

        // Set custom claims for the user's role.
        await auth.setCustomUserClaims(userRecord.uid, { role: role });
        
        // Store user info in Firestore
        await db.collection('users').doc(userRecord.uid).set({
            displayName,
            email,
            role,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        // The sendWelcomeEmail function will now trigger automatically on user creation.
        // We don't need to manually call it or handle email logic here.

        return { result: `Successfully triggered creation for user ${email} with role ${role}.` };

    } catch (error: any) {
        functions.logger.error("Error creating user:", error);
        if (error.code === 'auth/email-already-exists') {
            throw new functions.https.HttpsError('already-exists', 'This email address is already in use by another account.');
        }
        throw new functions.https.HttpsError('internal', `Failed to create user: ${error.message}`);
    }
});


/**
 * Sends a welcome email to a new user with a link to set their password.
 * This function is triggered automatically whenever a new Firebase user is created.
 */
export const sendWelcomeEmail = functions.auth.user().onCreate(async (user: UserRecord) => {
    const { email, displayName, uid } = user;

    if (!email) {
        functions.logger.log(`User ${uid} does not have an email. Cannot send welcome email.`);
        return;
    }
    
    if (!resend) {
        functions.logger.error(`Resend not configured. Cannot send welcome email to ${email}.`);
        return;
    }

    try {
        // Generate a password reset link. This is the most secure way for a new user to set their initial password.
        const link = await auth.generatePasswordResetLink(email);

        const mailOptions = {
            from: "G-Electra Hub <onboarding@resend.dev>",
            to: email,
            subject: "Welcome to G-Electra Hub!",
            html: `
            <h1>Welcome to the G-Electra Community!</h1>
            <p>Hello ${displayName || 'there'},</p>
            <p>An administrator has created an account for you on the G-Electra Hub.</p>
            <p>To get started, please click the link below to set your password:</p>
            <p><a href="${link}" target="_blank" style="color: #00FFFF; text-decoration: none;">Set Your Password</a></p>
            <p>This link is valid for 24 hours.</p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Best,</p>
            <p>The G-Electra Team</p>
            `,
        };

        functions.logger.log(`Sending welcome/password-set email to ${email}`);
        await resend.emails.send(mailOptions);
        functions.logger.log(`Welcome email sent successfully to ${email}.`);

    } catch (error: any) {
        functions.logger.error(`Error sending welcome email to ${email}:`, error);
    }
});
