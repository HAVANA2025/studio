
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

        // The onCreate trigger will send the welcome email.
        return { result: `Successfully created user ${email} with role ${role}.` };

    } catch (error: any) {
        console.error("Error creating user:", error);
        // Throw a more specific error to the client.
        if (error.code === 'auth/email-already-exists') {
            throw new functions.https.HttpsError('already-exists', 'This email address is already in use by another account.');
        }
        throw new functions.https.HttpsError('internal', `Failed to create user in Firebase Auth: ${error.message}`);
    }
});


/**
 * Sends a welcome email with credentials to new users created by an admin.
 */
export const sendWelcomeEmail = functions.auth.user().onCreate(async (user: UserRecord) => {
  const email = user.email;
  const displayName = user.displayName || 'there';
  
  if (!email) {
    functions.logger.log("User does not have an email. Cannot send welcome email.");
    return;
  }
  
  if (!resend) {
    functions.logger.error("Resend API key not configured. Cannot send welcome email.");
    return;
  }
  
  // To get the temporary password, it needs to be generated in the addUser function
  // and passed here. For simplicity and better security, we will instead instruct
  // the user to set their password via the "Forgot Password" flow.
  // We'll generate a password reset link.
  const link = await admin.auth().generatePasswordResetLink(email);


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

  try {
    await resend.emails.send(mailOptions);
    functions.logger.log(`Welcome email sent successfully to ${email}`);
  } catch (error) {
    functions.logger.error("Error sending welcome email:", error);
  }
});
