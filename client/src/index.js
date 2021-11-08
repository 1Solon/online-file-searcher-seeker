import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from './components/HomePage'
import Login from './components/Login'
// import SideBar from './components/SideBar'
import 'bootstrap/dist/css/bootstrap.min.css'

<<<<<<< HEAD
let isUserLoggedIn = true;
=======
let isUserLoggedIn = false
>>>>>>> ac1b3970b272b1f88a5ce4632c0aa2cd34111453

if (isUserLoggedIn == true) {
    ReactDOM.render(<HomePage />, document.getElementById('root'))
} else {
    ReactDOM.render(<Login />, document.getElementById('root'))
}