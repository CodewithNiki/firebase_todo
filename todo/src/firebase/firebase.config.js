import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCKwqzOrp5pTasml-29DeGXoSiw8Cb9o5I",
  authDomain: "todo-app-4ed39.firebaseapp.com",
  projectId: "todo-app-4ed39",
  storageBucket: "todo-app-4ed39.appspot.com",
  messagingSenderId: "111517574241",
  appId: "1:111517574241:web:2095cb424d866dfccb7620"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);