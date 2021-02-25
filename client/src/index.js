import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
  apiKey: "AIzaSyC9mGfnU8Cse_JXQRqjJZ_lr-mNJmKnDl4",
  authDomain: "rocket-mortgage-devrel-tracker.firebaseapp.com",
  databaseURL: "https://rocket-mortgage-devrel-tracker-default-rtdb.firebaseio.com",
  projectId: "rocket-mortgage-devrel-tracker",
  storageBucket: "rocket-mortgage-devrel-tracker.appspot.com",
  messagingSenderId: "314313322302",
  appId: "1:314313322302:web:5fa1d59e84fe0b4d27466f",
  measurementId: "G-JW0GPH1V70"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
