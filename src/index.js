import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import { initAuth } from './Helpers/Auth';
// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
  apiKey: "AIzaSyBhWCedCUO7yVNDd-nhnAXatyq0V6GShic",
  authDomain: "elderly-622a9.firebaseapp.com",
  databaseURL: "https://elderly-622a9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "elderly-622a9",
  storageBucket: "elderly-622a9.appspot.com",
  messagingSenderId: "792971798543",
  appId: "1:792971798543:web:2c5ffefb25ca6926131b7a",
  measurementId: "G-GXN13DRQ8W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
initAuth(firebase.database())

// export const db = firebase.database()