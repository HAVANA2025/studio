
import admin from 'firebase-admin';

// This check prevents re-initialization on hot reloads in development
if (!admin.apps.length) {
  try {
    const serviceAccountString = process.env.FIREBASE_ADMIN_JSON;
    
    if (!serviceAccountString) {
      throw new Error('The FIREBASE_ADMIN_JSON environment variable is not set. It is required for server-side Firebase Admin operations. Please check your environment configuration.');
    }

    // Parse the service account key from the environment variable
    const serviceAccount = JSON.parse(serviceAccountString);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    console.error('Firebase Admin Initialization Error:', error.message);
    // This will prevent the app from starting if the admin SDK fails to initialize,
    // which is better than failing silently at runtime.
    throw new Error(`Failed to initialize Firebase Admin SDK: ${error.message}`);
  }
}

export { admin };
