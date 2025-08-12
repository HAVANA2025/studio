
import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import axios from 'axios';

// Initialize Firebase Admin SDK safely
try {
  if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_JSON!);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
} catch (error: any) {
    console.error('Firebase Admin Initialization Error:', error.message);
    // This will prevent the API route from being created if initialization fails.
}


export async function POST(req: Request) {
  // Ensure the app is initialized before proceeding
  if (!admin.apps.length) {
    console.error('Firebase Admin SDK is not initialized.');
    return NextResponse.json({ error: 'Firebase Admin SDK is not initialized. Check server logs.' }, { status: 500 });
  }

  try {
    const { name, email, role, phone, tempPassword } = await req.json();

    // 1. Create the user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password: tempPassword,
      displayName: name,
    });

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
    await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { 
            email: process.env.BREVO_SENDER_EMAIL, 
            name: process.env.BREVO_SENDER_NAME 
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
              'api-key': process.env.BREVO_API_KEY!, 
              'content-type': 'application/json',
              'accept': 'application/json',
          } 
      }
    );

    return NextResponse.json({ success: true, uid: userRecord.uid });
  } catch (error: any) {
    console.error('Create User Error:', error.response ? error.response.data : error.message);
    const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
