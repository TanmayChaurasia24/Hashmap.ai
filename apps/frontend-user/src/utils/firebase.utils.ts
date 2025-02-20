import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider()
const githubprovider = new GithubAuthProvider()

const firebaseConfig = {
  apiKey: "AIzaSyAXIGV9SLq1fLYLclqDtuxWmFiGennYuMo",
  authDomain: "Hashmap.ai-adefc.firebaseapp.com",
  projectId: "Hashmap.ai-adefc",
  storageBucket: "Hashmap.ai-adefc.firebasestorage.app",
  messagingSenderId: "801101742563",
  appId: "1:801101742563:web:064a7895973bd87b5620d6",
  measurementId: "G-Z68S4JRN2W"
};

// 5f0535ee4421376f2c23030f85dd7c4487d95de6

// Initialize Firebase
const app = initializeApp(firebaseConfig);

provider.setCustomParameters({   
    prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGithubPopup = () => signInWithPopup(auth,githubprovider);