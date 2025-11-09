// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNcvdM8ckE4gCxbxduxZFbDlmRWx3G13M",
  authDomain: "indulge-93dc5.firebaseapp.com",
  databaseURL: "https://indulge-93dc5-default-rtdb.firebaseio.com",
  projectId: "indulge-93dc5",
  storageBucket: "indulge-93dc5.firebasestorage.app",
  messagingSenderId: "30146789957",
  appId: "1:30146789957:web:d18756e2152a4f16e9192c",
  measurementId: "G-15VPVN54Z2"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// ---------------------

// Get references to the services
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db, app };