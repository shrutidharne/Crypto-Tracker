// src/utils/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Add this
const firebaseConfig = {
  apiKey: "AIzaSyDMnZu6tiKYUF1GRkGL311uLLEbOkiWERw",
  authDomain: "crypto-c39a9.firebaseapp.com",
  projectId: "crypto-c39a9",
  storageBucket: "crypto-c39a9.appspot.com",
  messagingSenderId: "972476520576",
  appId: "1:972476520576:web:6016c7d6bcbfc25ecb6e65",
 measurementId: "G-1J8EYSFL43"
};
console.log("Firebase Config:", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Add this
// Google Auth provider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signOut, db,storage };
