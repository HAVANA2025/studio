
import * as functions from "firebase-functions/v1";
import { Resend } from "resend";

// Initialize Resend with the API key set in Firebase config
// `firebase functions:config:set resend.apikey="YOUR_API_KEY"`
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

    return resend.emails.send(mailOptions)
        .then(() => functions.logger.log("Welcome email sent successfully."))
        .catch((error) => functions.logger.error("Error sending welcome email:", error));
});


/**
 * A callable function to send an email from the contact form.
 */
export const sendContactMessage = functions.https.onCall(async (data, context) => {
    const { name, email, message } = data;

    // Basic validation
    if (!name || !email || !message) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing required fields: name, email, or message.');
    }
    
    const mailOptions = {
      from: 'G-Electra Hub Contact Form <onboarding@resend.dev>',
      to: ['gelectra@gitam.edu'], // Your club's email
      subject: `New message from ${name} on G-Electra Hub`,
      reply_to: email,
      html: `
        <p>You have received a new message from the G-Electra Hub contact form.</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    try {
        await resend.emails.send(mailOptions);
        functions.logger.log(`Contact email sent from ${email}`);
        return { success: true };
    } catch (error) {
        functions.logger.error("Error sending contact email:", error);
        throw new functions.https.HttpsError('internal', 'Failed to send email.');
    }
});
