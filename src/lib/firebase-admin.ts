
import admin from 'firebase-admin';

// This check prevents re-initialization on hot reloads in development
if (!admin.apps.length) {
  try {
    const serviceAccountString = process.env.FIREBASE_ADMIN_JSON;
    
    if (serviceAccountString) {
      // The JSON string from the environment variable might have escaped newlines.
      // We replace them with actual newline characters before parsing.
      const serviceAccount = JSON.parse(serviceAccountString.replace(/\\n/g, '\n'));

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
        console.warn('FIREBASE_ADMIN_JSON environment variable is not set. Firebase Admin SDK not initialized.');
    }
  } catch (error: any) {
    console.error('Firebase Admin Initialization Error:', error.message);
  }
}

export { admin };
