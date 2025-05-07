// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBW83i67msnAzP4LLH2Gjoaqx5Q3XAlGw",
  authDomain: "fir-course-12e16.firebaseapp.com",
  projectId: "fir-course-12e16",
  storageBucket: "fir-course-12e16.firebasestorage.app",
  messagingSenderId: "310326769546",
  appId: "1:310326769546:web:9e135141ec732a8437ba73",
  measurementId: "G-44Y6XNM7BK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();