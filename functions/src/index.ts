
'use server';
import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import type {UserRecord} from "firebase-functions/v1/auth";
import {Resend} from "resend";
import { v4 as uuidv4 } from 'uuid';
import { adminEmails } from './adminEmails';

admin.initializeApp();
const auth = admin.auth();
const db = admin.firestore();

const RESEND_API_KEY = functions.config().resend?.apikey;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

/**
 * A callable function for admins to create a new user.
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

    // Generate a secure, complex temporary password for the new user.
    const temporaryPassword = `temp-${uuidv4()}`;

    try {
        const userRecord = await auth.createUser({
            email,
            displayName,
            password: temporaryPassword, 
        });

        // Set a custom claim for the user's role.
        await auth.setCustomUserClaims(userRecord.uid, { role: role });
        
        // Store user info in Firestore
        await db.collection('users').doc(userRecord.uid).set({
            displayName,
            email,
            role,
            isTempPassword: true,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        // Trigger welcome email with temporary password
        if (resend) {
             const mailOptions = {
                from: "G-Electra Hub <onboarding@resend.dev>",
                to: email,
                subject: "Welcome to G-Electra Hub!",
                html: `
                <h1>Welcome to the G-Electra Community!</h1>
                <p>Hello ${displayName},</p>
                <p>An administrator has created an account for you on the G-Electra Hub.</p>
                <p>Please use the following credentials to log in:</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Temporary Password:</strong> ${temporaryPassword}</p>
                <p>You will be required to change this password after your first login.</p>
                <p>Best,</p>
                <p>The G-Electra Team</p>
                `,
            };
             await resend.emails.send(mailOptions);
        } else {
            functions.logger.error("Resend API key not configured. Cannot send welcome email.");
        }


        return { result: `Successfully created user ${email} with role ${role}.` };

    } catch (error: any) {
        console.error("Error creating user:", error);
        if (error.code === 'auth/email-already-exists') {
            throw new functions.https.HttpsError('already-exists', 'This email address is already in use by another account.');
        }
        throw new functions.https.HttpsError('internal', `Failed to create user: ${error.message}`);
    }
});


/**
 * This function is no longer responsible for sending the initial welcome email with credentials,
 * as that logic has been moved into the `addUser` function to include the temporary password.
 * It can be repurposed for other "on user create" events if needed later.
 */
export const sendWelcomeEmail = functions.auth.user().onCreate(async (user: UserRecord) => {
  functions.logger.log(`New user signed up: ${user.email}. The addUser function is responsible for sending the welcome email.`);
  return null;
});
