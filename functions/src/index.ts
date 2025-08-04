import * as functions from "firebase-functions";
import {Resend} from "resend";

// Initialize Resend with the API key you set in the config.
// The key is fetched securely from Firebase function configuration.
const resend = new Resend(functions.config().resend.apikey);

/**
 * Sends a welcome email to new users when they sign up.
 */
export const sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const email = user.email;

  // Exit if the user doesn't have an email (e.g., anonymous login)
  if (!email) {
    console.log(
      "User does not have an email address. Cannot send welcome email."
    );
    return;
  }

  // Define the email payload.
  // We use "onboarding@resend.dev" as the sender because you haven't
  // verified a custom domain. This is perfect for testing.
  const mailOptions = {
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

  console.log(`Sending welcome email to ${email}`);

  // Use the Resend SDK to send the email
  return resend.emails.send(mailOptions)
    .then(() => console.log("Welcome email sent successfully."))
    .catch((error) => console.error("Error sending welcome email:", error));
});
