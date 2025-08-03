// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// Hardcoded list of admin emails
const adminEmails = ['admin@example.com', 'showryjames@gitam.in'];

export { app, db, auth, storage, adminEmails };
