import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

//importar os dados do firebase a partir do .env

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};
console.log(firebaseConfig);
export const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
export const auth = getAuth();
export const firestore = getFirestore();
export const functions = getFunctions();
export const connections = collection(firestore, "connections");

