// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLKTYYUs_B8I2RjEctPGC72cMEX1qKFgU",
  authDomain: "pizza-resto.firebaseapp.com",
  projectId: "pizza-resto",
  storageBucket: "pizza-resto.appspot.com",
  messagingSenderId: "1027031119879",
  appId: "1:1027031119879:web:97a75420556bcfb27ad2a2"
};

// Initialize Firebase
const firebaseapp = firebase.initializeApp(firebaseConfig);

//Use for db
const db = firebaseapp.firestore()
const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()

export { db, auth, googleProvider, facebookProvider }