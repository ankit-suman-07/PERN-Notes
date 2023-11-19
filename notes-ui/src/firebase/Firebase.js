// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBABM0qYHuAXW8Yrz6RsQW3LeCBdKEzhMQ",
    authDomain: "dashboard-auth-d4186.firebaseapp.com",
    projectId: "dashboard-auth-d4186",
    storageBucket: "dashboard-auth-d4186.appspot.com",
    messagingSenderId: "128430651736",
    appId: "1:128430651736:web:925842b208801ee761cd2d",
    measurementId: "G-CVD9N7ZN4Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();