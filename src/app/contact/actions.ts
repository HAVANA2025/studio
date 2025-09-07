
'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});


export async function sendContactEmail(formData: z.infer<typeof contactSchema>) {
  // Validate the form data first
  const validatedFields = contactSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data. Please check your inputs.',
    };
  }
  
  const { name, email, message } = validatedFields.data;

  // Check for Resend API key
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error('Resend API key is not configured.');
    return { 
      success: false, 
      error: 'The contact form is currently unavailable. Please try again later.' 
    };
  }

  const resend = new Resend(resendApiKey);

  try {
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
      console.error('Resend API Error:', error);
      return { success: false, error: 'Failed to send email. Please try again.' };
    }
    
    return { success: true, data };

  } catch (error) {
    console.error('Error in sendContactEmail:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
