// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAfTISGoZXIIrosuGGEn_1xH2s4VcfHNnQ",
    authDomain: "caloriecounter-33664.firebaseapp.com",
    projectId: "caloriecounter-33664",
    storageBucket: "caloriecounter-33664.appspot.com",
    messagingSenderId: "742099956042",
    appId: "1:742099956042:web:33950b2a2e77756ab351b3",
    measurementId: "G-V1BPEGL7PQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app); // Authentication
const db = getFirestore(app); // Firestore
const storage = getStorage(app); // Storage

export { auth, db, storage };