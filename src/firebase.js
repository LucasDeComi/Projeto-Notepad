import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaNPXtSDOsc1nXrjpHoKAqYTkY3Rrf5S4",
  authDomain: "projeto-notepad.firebaseapp.com",
  projectId: "projeto-notepad",
  storageBucket: "projeto-notepad.firebasestorage.app",
  messagingSenderId: "1094034788742",
  appId: "1:1094034788742:web:aae5aced64cd38beb59c07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);