import { initializeApp } from "firebase/app";import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: "874fgEZGDSFQV51"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db }