// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// مهم: لازم .appspot.com مش .firebasestorage.app
const firebaseConfig = {
    apiKey: "AIzaSyCUUwEqUF_TeAHGLS9fQg4HulnRP8zmUcI",
    authDomain: "elhawary-sun.firebaseapp.com",
    projectId: "elhawary-sun",
    storageBucket: "elhawary-sun.appspot.com", // ← عدّلها كده
    messagingSenderId: "94642668824",
    appId: "1:94642668824:web:33c2239179f2794ef00a6d",
    // مفيش داعي للـ measurementId هنا
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
