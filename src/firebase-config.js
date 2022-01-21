// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASxV8iESmsMKjnrmnyTc_-jSPPdPjcWeU",
  authDomain: "ecommerce-87b63.firebaseapp.com",
  projectId: "ecommerce-87b63",
  storageBucket: "ecommerce-87b63.appspot.com",
  messagingSenderId: "328518221576",
  appId: "1:328518221576:web:a41fdc95160fc42e5a36bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);