import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Podria agregarse al .env y excluirlo en gitignore
const firebaseConfig = {
  apiKey: "AIzaSyD19GIj6m3b-7qi8T8JsSfmJ_Vq8ohwIgw",
  authDomain: "apialimentos-b5047.firebaseapp.com",
  projectId: "apialimentos-b5047",
  storageBucket: "apialimentos-b5047.appspot.com",
  messagingSenderId: "680950184702",
  appId: "1:680950184702:web:c0f1fef2f3c83d2a5643af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
