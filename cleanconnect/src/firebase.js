// firebase.js
// This file initializes Firebase services for the application.

import { initializeApp } from "firebase/app"; // Import Firebase app
import { getAnalytics } from "firebase/analytics"; // Import Firebase analytics
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth } from "firebase/auth"; // Import Firebase Authentication

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALfXrAg3fRoJX8zIdAorKSYUIVbCmxE9o",
  authDomain: "cleanconnect-1a8d0.firebaseapp.com",
  projectId: "cleanconnect-1a8d0",
  storageBucket: "cleanconnect-1a8d0.appspot.com",
  messagingSenderId: "48043241525",
  appId: "1:48043241525:web:4dd7d3bcc887e96057817c",
  measurementId: "G-2GRC243R1M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Authentication

// Export the services you'll use in your app
export { db, auth };