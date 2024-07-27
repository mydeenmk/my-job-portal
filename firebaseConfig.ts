// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, updateCurrentUser } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSfIPAqaRqgR2CvVcjsnh3lS1zTvaJ8ps",
  authDomain: "web-portal-ea218.firebaseapp.com",
  projectId: "web-portal-ea218",
  storageBucket: "web-portal-ea218.appspot.com",
  messagingSenderId: "788603823795",
  appId: "1:788603823795:web:d417d1d8a694e71321f2c6"
};

// Initialize Firebase
const app =  initializeApp(firebaseConfig) ;
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);