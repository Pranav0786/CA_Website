import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAI4JNHwbxMxeGe50uuP7oE2EOYNdFyOpU",
    authDomain: "chartered-accountant-2f504.firebaseapp.com",
    projectId: "chartered-accountant-2f504",
    storageBucket: "chartered-accountant-2f504.firebasestorage.app",
    messagingSenderId: "528739359376",
    appId: "1:528739359376:web:a485887915eb96bf26d615",
    measurementId: "G-2WWGJHLG7V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
