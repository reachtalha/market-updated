import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAf4ctu-RFtPxiUqMpwHUVGTK_9Qy5p0rU",
  authDomain: "market-updated.firebaseapp.com",
  projectId: "market-updated",
  storageBucket: "market-updated.appspot.com",
  messagingSenderId: "942459701728",
  appId: "1:942459701728:web:b0eae2b6f026ac84acc385",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);