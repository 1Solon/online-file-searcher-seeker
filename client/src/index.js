import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
// import SideBar from './components/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';

let isUserLoggedIn = false;

if (isUserLoggedIn == true) {
    ReactDOM.render(<HomePage />, document.getElementById('root'));
} else {
    ReactDOM.render(<Login />, document.getElementById('root'));
}