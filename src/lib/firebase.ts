// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  projectId: "g-electra-hub",
  appId: "1:788171080845:web:8d270d4a30006aa8468ec4",
  storageBucket: "g-electra-hub.appspot.com",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "g-electra-hub.firebaseapp.com",
  messagingSenderId: "788171080845",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
let auth: ReturnType<typeof getAuth>;
let db: ReturnType<typeof getFirestore>;
let storage: ReturnType<typeof getStorage>;
let functions: ReturnType<typeof getFunctions>;

// Safely initialize Firebase services only on the client-side
// or when the API key is available. This prevents build errors.
if (typeof window !== 'undefined' || firebaseConfig.apiKey) {
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    functions = getFunctions(app);
} else {
    // Provide mock instances or null objects for server-side build
    auth = {} as any;
    db = {} as any;
    storage = {} as any;
    functions = {} as any;
}


// Hardcoded list of admin emails
const adminEmails = [
    'mtatinen@gitam.edu',
    'nmenmula@gitam.edu',
    'adid@gitam.edu',
    'gelectra@gitam.edu',
    'webdevlopment0210@gmail.com',
    'premkumarjanumula@gmail.com',
];

export { app, db, auth, storage, functions, adminEmails };
