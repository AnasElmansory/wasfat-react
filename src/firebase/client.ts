// import { firestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as firestore from "firebase/firestore";
import * as firebaseAuth from "firebase/auth";
import * as fireStorage from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg7jvL5EamwojCE7-cx1rAUdfsYgEj2Xg",
  authDomain: "wasfat-5edfe.firebaseapp.com",
  projectId: "wasfat-5edfe",
  storageBucket: "wasfat-5edfe.appspot.com",
  messagingSenderId: "54356560170",
  appId: "1:54356560170:web:853554457d5e65295a7653",
  measurementId: "G-GXX17MKRKL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = firebaseAuth.getAuth(app);
const store = firestore.getFirestore(app);
const storage = fireStorage.getStorage(app);
export { firestore, store, auth, firebaseAuth, storage, fireStorage };
