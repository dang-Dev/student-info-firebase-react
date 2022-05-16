import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYTtNhmxGFY-T25JRkzkVFHoEF43Ss56M",
  authDomain: "student-info-sys-10284.firebaseapp.com",
  projectId: "student-info-sys-10284",
  storageBucket: "student-info-sys-10284.appspot.com",
  messagingSenderId: "217597080968",
  appId: "1:217597080968:web:6c52119acdd43527b1f63d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;