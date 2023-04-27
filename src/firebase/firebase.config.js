// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPZgDJ2dgjCpLUq7eNnpHQuYd5j1bVdCA",
  authDomain: "fir-auth-be778.firebaseapp.com",
  projectId: "fir-auth-be778",
  storageBucket: "fir-auth-be778.appspot.com",
  messagingSenderId: "149740692388",
  appId: "1:149740692388:web:94ba928933b79d8dd39731"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;