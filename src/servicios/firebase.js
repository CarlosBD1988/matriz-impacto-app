// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAYNkYqvcq7bwfaucZt2TYlOlVB7PqF1aU",
    authDomain: "calculadoraapp-27a47.firebaseapp.com",
    projectId: "calculadoraapp-27a47",
    storageBucket: "calculadoraapp-27a47.appspot.com",
    messagingSenderId: "672306459518",
    appId: "1:672306459518:web:19fd5edf851f7532a0b92f"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db };
