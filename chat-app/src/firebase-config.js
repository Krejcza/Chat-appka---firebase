// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ5HLZ3KJqm4jPvsVqZVdv4KUVr1MHZAs",
  authDomain: "chat-app-d83e4.firebaseapp.com",
  projectId: "chat-app-d83e4",
  storageBucket: "chat-app-d83e4.appspot.com",
  messagingSenderId: "183477300758",
  appId: "1:183477300758:web:5b147acb2ab8f0810a4f37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)