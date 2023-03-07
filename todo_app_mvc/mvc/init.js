export const C_PATH_TO_MODE = {
  "index.html": "signup",
  "login.html": "signin",
  "users.html": "main",
};

const firebaseConfig = {
  apiKey: "AIzaSyAGpYFnWzNHj_wMOHiGeFJs-sd52a-xL3s",
  authDomain: "work7-4.firebaseapp.com",
  projectId: "work7-4",
  storageBucket: "work7-4.appspot.com",
  messagingSenderId: "109140872335",
  appId: "1:109140872335:web:8a191b5d93b12d66e674fa",
  measurementId: "G-L9GR01CVYX",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
