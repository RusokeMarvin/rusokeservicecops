import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBxUMf4ASytBGY6RKg3DccIGfhbrxzb4OI",
  authDomain: "servicecops-b9cb2.firebaseapp.com",
  projectId: "servicecops-b9cb2",
  storageBucket: "servicecops-b9cb2.firebasestorage.app",
  messagingSenderId: "703349812895",
  appId: "1:703349812895:web:567e167301bf553a2abcaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)

export {app, auth};