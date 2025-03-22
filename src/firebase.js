import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { query, where } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyARS8ZXvyy8Rz4NFI04lpl9EvKKM3VkvOM",
    authDomain: "todolist-app-1ca7a.firebaseapp.com",
    projectId: "todolist-app-1ca7a",
    storageBucket: "todolist-app-1ca7a.appspot.com",
    messagingSenderId: "259667889839",
    appId: "1:259667889839:web:171e8cc620132021bd8e5a",
    measurementId: "G-6R9D67P6LD"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();



export { db, auth, provider, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where };
