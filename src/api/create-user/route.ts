
import { NextResponse } from 'next/server';
import { admin } from '@/lib/firebase-admin'; // Use the centralized admin instance
import axios from 'axios';

export async function POST(req: Request) {
  // The admin app is now guaranteed to be initialized by the import from @/lib/firebase-admin
  try {
    const { name, email, role, phone } = await req.json();
    const tempPassword = Math.random().toString(36).slice(-8);

    // 1. Create the user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password: tempPassword,
      displayName: name,
      phoneNumber: phone || undefined,
    });

    // Set custom claims for role-based access if needed
    if (role === 'Executive Board') {
        await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'admin' });
    }

    // 2. Store extra data in Firestore
    const db = admin.firestore();
    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      role,
      phone: phone || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      isTempPassword: true, // Flag to force password reset on first login
    });

    // 3. Send welcome email via Brevo
    if (process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL) {
        await axios.post(
          'https://api.brevo.com/v3/smtp/email',
          {
            sender: { 
                email: process.env.BREVO_SENDER_EMAIL, 
                name: process.env.BREVO_SENDER_NAME || 'G-Electra Hub'
            },
            to: [{ email, name }],
            subject: 'Welcome to G-Electra Hub!',
            htmlContent: `
                <h1>Welcome, ${name}!</h1>
                <p>An administrator has created an account for you on the G-Electra Hub.</p>
                <p>Please use the following credentials to log in:</p>
                <ul>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Temporary Password:</strong> ${tempPassword}</li>
                </ul>
                <p>You will be required to change this password after your first login.</p>
                <p>Thank you!</p>
                <p>The G-Electra Team</p>
            `,
          },
          { 
              headers: { 
                  'api-key': process.env.BREVO_API_KEY, 
                  'content-type': 'application/json',
                  'accept': 'application/json',
              } 
          }
        );
    } else {
        console.warn('Brevo credentials are not fully set in .env.local. Skipping welcome email.');
    }

    return NextResponse.json({ success: true, uid: userRecord.uid });
  } catch (error: any) {
    // Log the detailed error to the server console for debugging
    console.error('Firebase Create User Error:', error);
    
    // Return a more informative error message to the client
    const errorMessage = error.message || 'An unknown error occurred while creating the user.';
    
    // It's also helpful to check for specific Firebase error codes
    if (error.code === 'auth/email-already-exists') {
      return NextResponse.json({ error: 'A user with this email address already exists.' }, { status: 409 });
    }
     if (error.code === 'auth/invalid-phone-number') {
      return NextResponse.json({ error: 'The phone number is not valid.' }, { status: 400 });
    }
      
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
