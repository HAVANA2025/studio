import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import type {UserRecord} from "firebase-functions/v1/auth";
import {Resend} from "resend";
import { v4 as uuidv4 } from 'uuid';
import { adminEmails } from './adminEmails';

admin.initializeApp();
const auth = admin.auth();

// Initialize Resend with the API key you set in the config
// Ensure RESEND_APIKEY is set: firebase functions:config:set resend.apikey="YOUR_API_KEY"
const resend = new Resend(functions.config().resend.apikey);

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

    try {
        const userRecord = await auth.createUser({
            email,
            displayName,
            // The user will receive a temporary password via email, so this can be random.
            password: uuidv4(),
        });

        // Set a custom claim for the user's role.
        await auth.setCustomUserClaims(userRecord.uid, { role: role });

        return { result: `Successfully created user ${email} with role ${role}.` };

    } catch (error: any) {
        console.error("Error creating user:", error);
        // Throw a more specific error to the client.
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

  // Generate a secure, random temporary password for the new user.
  // This password will be sent in the welcome email.
  const temporaryPassword = uuidv4().substring(0, 8);
  
  // Update the user's password in Firebase Auth to this temporary password.
  // This step is crucial. The user created via the Admin SDK has a random, unknown password.
  // This ensures the password in the email is the one they can actually use to log in.
  try {
      await auth.updateUser(user.uid, { password: temporaryPassword });
  } catch (error) {
      functions.logger.error(`Failed to update password for new user ${user.uid}`, error);
      // We might still want to send the email but log that the password is not set.
      // For now, we'll stop execution to prevent sending a useless email.
      return; 
  }


  const mailOptions = {
    from: "G-Electra Hub <onboarding@resend.dev>",
    to: email,
    subject: "Welcome to G-Electra Hub!",
    html: `
      <h1>Welcome to the G-Electra Community!</h1>
      <p>Hello ${displayName},</p>
      <p>An administrator has created an account for you on the G-Electra Hub.</p>
      <p>Please use the following credentials to log in:</p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Temporary Password:</strong> ${temporaryPassword}</li>
      </ul>
      <p>We recommend you change this password after you log in for the first time.</p>
      <p>Thank you!</p>
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
