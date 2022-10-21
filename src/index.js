import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyA5pPKO8J9sR1m3hyPu7WJw2MzIu0z0q6o",
  authDomain: "react-tchat-e518d.firebaseapp.com",
  databaseURL: "https://react-tchat-e518d.firebaseio.com",
  storageBucket: "react-tchat-e518d.appspot.com",
  messagingSenderId: "640840838780"
};

firebase.initializeApp(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
