import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCiJfiBURcILZ49xLX2qU186TtWd6mu9YU",
  authDomain: "intern-web-3975f.firebaseapp.com",
  projectId: "intern-web-3975f",
  storageBucket: "intern-web-3975f.appspot.com",
  messagingSenderId: "448287306948",
  appId: "1:448287306948:web:3ee21c04367e097e668591",
  measurementId: "G-2988MM2BGC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const signInWithEmailAndPasswordCustom = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export { db, auth, storage, signInWithEmailAndPasswordCustom };
