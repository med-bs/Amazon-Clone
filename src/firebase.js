import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBjVNYhxK4FU98eNiClf8MzM_ulnTcnz-E",

  authDomain: "clone-103b0.firebaseapp.com",

  projectId: "clone-103b0",

  storageBucket: "clone-103b0.appspot.com",

  messagingSenderId: "252768003986",

  appId: "1:252768003986:web:2c723a1939d0567b64434b",

  measurementId: "G-SZGCK5PMRF"

};


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};