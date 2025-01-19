import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBIGedzTsm1K1I6mqDP46fZMsPtDaHNhEY",
    authDomain: "evaluacion2-121dd.firebaseapp.com",
    databaseURL: "https://evaluacion2-121dd-default-rtdb.firebaseio.com",
    projectId: "evaluacion2-121dd",
    storageBucket: "evaluacion2-121dd.firebasestorage.app",
    messagingSenderId: "152490309107",
    appId: "1:152490309107:web:1143de8e22b865f4704e86",
    measurementId: "G-ZNZ8685BE3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase();