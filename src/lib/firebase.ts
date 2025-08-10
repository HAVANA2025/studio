// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "g-electra-hub",
  appId: "1:788171080845:web:8d270d4a30006aa8468ec4",
  storageBucket: "g-electra-hub.firebasestorage.app",
  apiKey: "AIzaSyDLujSdq_BO7Vf3kMPKk-VHWqBshM-IJ3U",
  authDomain: "g-electra-hub.firebaseapp.com",
  messagingSenderId: "788171080845",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const functions = getFunctions(app);

// Hardcoded list of admin emails
const adminEmails = [
    // Board Members
    'smotapar2@gitam.in',
    'sgaleti@gitam.in',
    'cthigull@gitam.in',
    'stummala9@gitam.in',
    'amadiraj2@gitam.in',
    'pjanumul@gitam.in',
    'lmaganti2@gitam.in',
    'dkommine@gitam.in',
    'kkasula@gitam.in',
    'kvemugan@gitam.in',
    // Club Handlers
    'mtatinen@gitam.edu',
    'nmenmula@gitam.edu',
    'adid@gitam.edu',
    // Main Admins
    'gelectra@gitam.edu',
    'webdevlopment0210@gmail.com',
    'admin@example.com' // Keeping the original for testing
];

export { app, db, auth, storage, functions, adminEmails };
