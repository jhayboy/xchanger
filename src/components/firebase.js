// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import firebase from 'firebase/app';
import 'firebase/firestore';
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoB9UEbioqSyKNPG8b2ec_qjjVhxVPtTA",
  authDomain: "pinetwork-8eb87.firebaseapp.com",
  databaseURL: "https://pinetwork-8eb87-default-rtdb.firebaseio.com",
  projectId: "pinetwork-8eb87",
  storageBucket: "pinetwork-8eb87.appspot.com",
  messagingSenderId: "370627107411",
  appId: "1:370627107411:web:32c5284793bbec9e8284a6"
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const auth = getAuth(app);

export {auth}
export {storage}
export default getFirestore()

// const auth = getAuth(app);
// const db = firebaseApp.firestore();


// export {auth}