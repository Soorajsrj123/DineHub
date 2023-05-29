import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBglrZfkz2mTbxroIoM_k-NBFpcZA2lxyg",
    authDomain: "dineout-55d7d.firebaseapp.com",
    projectId: "dineout-55d7d",
    storageBucket: "dineout-55d7d.appspot.com",
    messagingSenderId: "675473373923",
    appId: "1:675473373923:web:678d972d7b65f2829823d6",
    measurementId: "G-T12GLMHQ3Z"
  };

  const app = initializeApp(firebaseConfig);

 const auth=getAuth(app)
 const provider = new GoogleAuthProvider();

 export {auth,provider}