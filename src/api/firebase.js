// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY6TOYY4aVBqRAg9PwnzDgBS4PZqP5hzA",
  authDomain: "ai-music-generator-bc192.firebaseapp.com",
  projectId: "ai-music-generator-bc192",
  storageBucket: "ai-music-generator-bc192.appspot.com",
  messagingSenderId: "597853123971",
  appId: "1:597853123971:web:9e9c3a181985c920d8f2b6",
  measurementId: "G-74185K8EJ7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
