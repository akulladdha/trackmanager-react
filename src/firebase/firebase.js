// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6ofu2xJPl-CZ80rx_TWpiOqst6ZDY4ro",
  authDomain: "trackmanager-f5642.firebaseapp.com",
  projectId: "trackmanager-f5642",
  storageBucket: "trackmanager-f5642.firebasestorage.app",
  messagingSenderId: "295832898917",
  appId: "1:295832898917:web:0d93daf7defc6b7252e58c",
  measurementId: "G-HVMWSZEGPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth,db };