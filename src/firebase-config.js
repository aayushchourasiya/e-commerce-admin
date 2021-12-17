// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtWwQeaU9V2IeeLCsmCeDYQ4JGlvmg2Ng",
  authDomain: "combinedproject-js-native.firebaseapp.com",
  projectId: "combinedproject-js-native",
  storageBucket: "combinedproject-js-native.appspot.com",
  messagingSenderId: "916216928052",
  appId: "1:916216928052:web:995e637dc11552f064f761",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);