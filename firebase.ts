import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqidlnWDvxG1U2-uiQBYHeDuMdj1KrQgg",
  authDomain: "vanta-123456.firebaseapp.com",
  projectId: "vanta-123456",
  storageBucket: "vanta-123456.firebasestorage.app",
  messagingSenderId: "556246592820",
  appId: "1:556246592820:web:21e95b0c58d699c2d6c961",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);