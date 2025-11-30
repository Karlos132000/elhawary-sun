import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCUUwEqUF_TeAHGLS9fQg4HulnRP8zmUcI",
    authDomain: "elhawary-sun.firebaseapp.com",
    projectId: "elhawary-sun",
    storageBucket: "elhawary-sun.firebasestorage.app",
    messagingSenderId: "94642668824",
    appId: "1:94642668824:web:b49bc1d420f36cbbf00a6d",
    measurementId: "G-EYGXEWZF04"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
