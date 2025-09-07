
'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.error('Resend API key is not configured. Please set RESEND_API_KEY environment variable.');
}

const resend = new Resend(resendApiKey);

export async function sendContactEmail(formData: z.infer<typeof contactSchema>) {
  if (!resendApiKey) {
    return { success: false, error: 'The contact form is currently disabled. Please contact us directly via email.' };
  }

  try {
    const validatedData = contactSchema.parse(formData);
    const { name, email, message } = validatedData;

    const { data, error } = await resend.emails.send({
      from: 'G-Electra Hub Contact Form <onboarding@resend.dev>',
      to: ['gelectra@gitam.edu'],
      subject: `New message from ${name} on G-Electra Hub`,
      reply_to: email,
      html: `
        <p>You have received a new message from the G-Electra Hub contact form.</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }
    
    return { success: true, data };

  } catch (error) {
    if (error instanceof z.ZodError) {
        return { success: false, error: "Validation failed: " + error.errors.map(e => e.message).join(', ') };
    }
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}
