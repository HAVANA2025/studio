
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
    const sendContactMessage = httpsCallable(functions, 'sendContactMessage');
    const result = await sendContactMessage(validatedFields.data);
    
    const resultData = result.data as { success: boolean; error?: string };

    if (resultData.success) {
      return { success: true };
    } else {
      return { success: false, error: resultData.error || 'A server error occurred.' };
    }

  } catch (error: any) {
    console.error('Error calling Firebase Function:', error);
    return { success: false, error: error.message || 'An unexpected error occurred.' };
  }
}
