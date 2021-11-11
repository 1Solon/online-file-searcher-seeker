import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import HomePage from './components/HomePage';
import Login from './components/Login'; 
import 'bootstrap/dist/css/bootstrap.min.css';

// let isUserLoggedIn = false;

// if (isUserLoggedIn === true) {
//     ReactDOM.render(<HomePage />, document.getElementById('root'));
// } else {
//     ReactDOM.render(<Login />, document.getElementById('root'));
// }


ReactDOM.render(<App />, document.getElementById('root'));
