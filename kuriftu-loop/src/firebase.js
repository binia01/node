// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaue0mGmMGskCV4v_AIJPFH8WsMutyeO0",
  authDomain: "kuriftuloop.firebaseapp.com",
  projectId: "kuriftuloop",
  storageBucket: "kuriftuloop.firebasestorage.app",
  messagingSenderId: "590981021682",
  appId: "1:590981021682:web:c6c2a4adc4c0b57598756b",
  measurementId: "G-M3V6Y9Q7D8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

auth.settings.appVerificationDisabledForTesting = true;
connectAuthEmulator(auth, "http://localhost:9099");

export default app; // You can also export the app instance if needed