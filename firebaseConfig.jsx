// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEqfy0dtADVn0d5y5sRsQDkoCOVfnGpMM",
  authDomain: "draco-shop-6837d.firebaseapp.com",
  projectId: "draco-shop-6837d",
  storageBucket: "draco-shop-6837d.appspot.com",
  messagingSenderId: "653454148819",
  appId: "1:653454148819:web:3b3d4a063bfe6f2f7a8026",
  measurementId: "G-B45KEEB749"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});