// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDgoRWM4kdIv_TxNDbZoUE6yW1ZMRXdaRY",
  authDomain: "uireview-ab983.firebaseapp.com",
  projectId: "uireview-ab983",
  storageBucket: "uireview-ab983.appspot.com",
  messagingSenderId: "478289215958",
  appId: "1:478289215958:web:56f214b1378c117a7ae477",
  measurementId: "G-8DM47XDZZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app)