import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRWkCXKEeuwSHnFDHZzKReQ6aNpZyrzYw",
  authDomain: "hyperiottek.firebaseapp.com",
  projectId: "hyperiottek",
  storageBucket: "hyperiottek.firebasestorage.app",
  messagingSenderId: "582186086618",
  appId: "1:582186086618:web:b4c5dff4653f3e30b635e3",
  measurementId: "G-GZM2HKDKN9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);