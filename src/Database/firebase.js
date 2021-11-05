import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

// copy var firebaseConfig object AND firebase.initializeApp(firebaseConfig) line from firebase project console to he

const firebaseConfig = {
  apiKey: "AIzaSyCdooq-9jYs11yOoFmcoP5Jp7l38UtqfMM",
  authDomain: "mern-blog-87f25.firebaseapp.com",
  databaseURL: "https://mern-blog-87f25-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mern-blog-87f25",
  storageBucket: "mern-blog-87f25.appspot.com",
  messagingSenderId: "473283349122",
  appId: "1:473283349122:web:fec93d664cf0a392e1829b",
  measurementId: "G-4ZSJ6MCC7G"
};

export default firebase.initializeApp(firebaseConfig); 
