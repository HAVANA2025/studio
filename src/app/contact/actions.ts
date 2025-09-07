
'use server';

import { z } from 'zod';
import { functions } from '@/lib/firebase';
import { httpsCallable } from 'firebase/functions';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export async function sendContactEmail(formData: z.infer<typeof contactSchema>) {
  const validatedFields = contactSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data. Please check your inputs.',
    };
  }

  try {
    // This is a client-side SDK call to a backend Firebase Function
    const sendContactMessage = httpsCallable(functions, 'sendContactMessage');
    const result = await sendContactMessage(validatedFields.data);
    
    const resultData = result.data as { success: boolean; error?: string };

    if (resultData.success) {
      return { success: true };
    } else {
      console.error('Cloud Function Error:', resultData.error);
      return { success: false, error: resultData.error || 'Failed to send message via cloud function.' };
    }

  } catch (error: any) {
    console.error('Error calling Firebase Function:', error);
    // Capture specific Firebase error messages if available
    const errorMessage = error.message || 'An unexpected error occurred while contacting the server.';
    return { success: false, error: errorMessage };
  }
}
