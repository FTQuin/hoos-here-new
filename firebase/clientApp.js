// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {default as oldFirebase} from "firebase/compat/app"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO: move to .env.local
const firebaseConfig = {
  apiKey: "AIzaSyAoFA-2cZZ34Sv5lyqIkLhUGDiIXxb90D8",
  authDomain: "hoos-here-354204.firebaseapp.com",
  databaseURL: "https://hoos-here-354204-default-rtdb.firebaseio.com",
  projectId: "hoos-here-354204",
  storageBucket: "hoos-here-354204.appspot.com",
  messagingSenderId: "67078491804",
  appId: "1:67078491804:web:1cdcee3f7beefddbda2759",
  measurementId: "G-RETQ8MJ3NJ"
};

// Initialize Firebase
if (!oldFirebase.apps.length) {
  oldFirebase.initializeApp(firebaseConfig);
}

const firebaseApp = initializeApp(firebaseConfig)

// export
export {oldFirebase}
export default firebaseApp;
