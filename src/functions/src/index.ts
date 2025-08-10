
'use server';
import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import type {UserRecord} from "firebase-functions/v1/auth";
import {Resend} from "resend";
import { v4 as uuidv4 } from 'uuid';
import { adminEmails } from './adminEmails';

admin.initializeApp();
const auth = admin.auth();

const RESEND_API_KEY = functions.config().resend?.apikey;
if (!RESEND_API_KEY) {
    functions.logger.error("FATAL: Resend API key is not configured in functions environment.");
}
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

/**
 * A callable function for admins to create a new user.
 */
export const addUser = functions.https.onCall(async (data, context) => {
    functions.logger.info("addUser function triggered.", { data });

    // Check if the user calling the function is an admin.
    if (!context.auth || !context.auth.token.email) {
        functions.logger.error("Authentication check failed: No auth context or email.", { auth: context.auth });
        throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    }

    const callerEmail = context.auth.token.email;
    if (!adminEmails.includes(callerEmail)) {
        functions.logger.warn("Permission denied for user.", { email: callerEmail });
        throw new functions.https.HttpsError('permission-denied', 'Only admins can create new users.');
    }
    
    functions.logger.info(`Admin check passed for ${callerEmail}.`);

    const { email, displayName, role } = data;
    
    if (!email || !displayName || !role) {
         functions.logger.error("Invalid arguments.", { data });
         throw new functions.https.HttpsError('invalid-argument', 'Please provide email, displayName, and role.');
    }

    try {
        functions.logger.info(`Attempting to create user: ${email}`);
        const userRecord = await auth.createUser({
            email,
            displayName,
        });
        functions.logger.info(`Successfully created user in Auth: ${userRecord.uid}`);

        functions.logger.info(`Attempting to set custom claims for user ${userRecord.uid}`, { role });
        await auth.setCustomUserClaims(userRecord.uid, { role: role });
        functions.logger.info(`Successfully set custom claims for user ${userRecord.uid}`);

        return { result: `Successfully created user ${email} with role ${role}.` };

    } catch (error: any) {
        functions.logger.error("Error creating user or setting claims:", {
          errorMessage: error.message,
          errorCode: error.code,
          errorStack: error.stack,
        });
        // Throw a more specific error to the client.
        if (error.code === 'auth/email-already-exists') {
            throw new functions.https.HttpsError('already-exists', 'This email address is already in use by another account.');
        }
        throw new functions.https.HttpsError('internal', `Failed to create user: ${error.message}`);
    }
});


/**
 * Sends a welcome email with instructions to set a password.
 */
export const sendWelcomeEmail = functions.auth.user().onCreate(async (user: UserRecord) => {
  functions.logger.info(`sendWelcomeEmail triggered for user: ${user.uid}`, { email: user.email });
  
  const email = user.email;
  const displayName = user.displayName || 'there';
  
  if (!email) {
    functions.logger.warn("User does not have an email. Cannot send welcome email.", { uid: user.uid });
    return;
  }
  
  if (!resend) {
    functions.logger.error("Resend not initialized. Cannot send welcome email. Check API Key.", { uid: user.uid });
    return;
  }
  
  try {
    functions.logger.info(`Generating password reset link for ${email}`);
    const link = await admin.auth().generatePasswordResetLink(email);
    functions.logger.info(`Successfully generated password reset link for ${email}`);

    const mailOptions = {
        from: "G-Electra Hub <onboarding@resend.dev>",
        to: email,
        subject: "Welcome to G-Electra Hub!",
        html: `
        <h1>Welcome to the G-Electra Community!</h1>
        <p>Hello ${displayName},</p>
        <p>An administrator has created an account for you on the G-Electra Hub.</p>
        <p>Your username is your email address: <strong>${email}</strong>.</p>
        <p>To get started, please click the link below to set your password:</p>
        <p><a href="${link}" target="_blank">Set Your Password</a></p>
        <p>If you did not expect this, please ignore this email.</p>
        <p>Best,</p>
        <p>The G-Electra Team</p>
        `,
    };
    
    functions.logger.info(`Sending welcome email to ${email}`);
    await resend.emails.send(mailOptions);
    functions.logger.info(`Welcome email sent successfully to ${email}`);
  } catch (error: any) {
    functions.logger.error("Error in sendWelcomeEmail function:", {
        errorMessage: error.message,
        errorCode: error.code,
        errorStack: error.stack,
        uid: user.uid
    });
  }
});
