import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQ-qFdY3AqaEBxkacUxrAdVgaltp7WtXM",
  authDomain: "queueing-system-34fd5.firebaseapp.com",
  projectId: "queueing-system-34fd5",
  storageBucket: "queueing-system-34fd5.appspot.com",
  messagingSenderId: "577644801423",
  appId: "1:577644801423:web:d35f7ae02b81d22f346ffa",
  measurementId: "G-RJ97D6K69R",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
