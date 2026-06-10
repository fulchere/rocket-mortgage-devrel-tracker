import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyC9mGfnU8Cse_JXQRqjJZ_lr-mNJmKnDl4",
  authDomain: "rocket-mortgage-devrel-tracker.firebaseapp.com",
  databaseURL: "https://rocket-mortgage-devrel-tracker-default-rtdb.firebaseio.com",
  projectId: "rocket-mortgage-devrel-tracker",
  storageBucket: "rocket-mortgage-devrel-tracker.appspot.com",
  messagingSenderId: "314313322302",
  appId: "1:314313322302:web:5fa1d59e84fe0b4d27466f",
  measurementId: "G-JW0GPH1V70",
});

export const auth = getAuth(app);
export default app;
