
import * as functions from "firebase-functions";
import {Resend} from "resend";

// Initialize Resend with the API key you set in the config
const resend = new Resend(functions.config().resend.apikey);

/**
 * Sends a welcome email to new users when they sign up.
 */
export const sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const email = user.email;

  if (!email) {
    functions.logger.log("User does not have an email. Cannot send welcome email.");
    return;
  }

  const mailOptions = {
    // This 'from' address uses Resend's test domain.
    // It's perfect for development.
    from: "G-Electra Hub <onboarding@resend.dev>",
    to: email,
    subject: "Welcome to G-Electra Hub!",
    html: `
      <h1>Welcome to the G-Electra Community!</h1>
      <p>Hi ${user.displayName || "there"},</p>
      <p>Thank you for joining the G-Electra Hub. We're excited to have you with us.</p>
      <p>You can now log in to check out the latest announcements, events, and more.</p>
      <p>Best,</p>
      <p>The G-Electra Team</p>
    `,
  };

  functions.logger.log(`Sending welcome email to ${email}`);

  // Send the email using the Resend SDK
  return resend.emails.send(mailOptions)
    .then(() => functions.logger.log("Welcome email sent successfully."))
    .catch((error) => functions.logger.error("Error sending welcome email:", error));
});
