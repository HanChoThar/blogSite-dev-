import { initializeApp } from "firebase/app";
import {  getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxckYzmoy3oTevpfCNVkx-_O_ivZLKCFk",
  authDomain: "blogsite-311c3.firebaseapp.com",
  projectId: "blogsite-311c3",
  storageBucket: "blogsite-311c3.appspot.com",
  messagingSenderId: "1015379100545",
  appId: "1:1015379100545:web:6a3fa54d0c7b974f2b5e80"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db
