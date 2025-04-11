// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
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

if (process.env.NODE_ENV === 'development') {
  auth.settings.appVerificationDisabledForTesting = true; // Only for emulator testing
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, 'localhost', 8080); // Add Firestore emulator if you're using it
  // Add other emulators as needed (Storage, Functions, etc.)
}

export default app;