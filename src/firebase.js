import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHJhWbRM6yrWKw_WkI49eAF8ys7_F1JxI",
  authDomain: "online-food-delivery-7f0a4.firebaseapp.com",
  projectId: "online-food-delivery-7f0a4",
  storageBucket: "online-food-delivery-7f0a4.appspot.com",
  messagingSenderId: "738341468743",
  appId: "1:738341468743:web:0b50b8193c4adf90db4f62"
};

// Use this to initialize the firebase app
const firebaseapp = firebase.initializeApp(firebaseConfig);

// Use for db
const db = firebaseapp.firestore()
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { db, auth, googleProvider } 
  