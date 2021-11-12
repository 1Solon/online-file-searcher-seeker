import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from './components/HomePage'
import Login from './components/Login'
import UserPage from './components/UserPage'
import 'bootstrap/dist/css/bootstrap.min.css'

let isUserLoggedIn = 3;
sessionStorage.setItem("logged-in", isUserLoggedIn);

if (isUserLoggedIn === 1) {
    ReactDOM.render(<HomePage />, document.getElementById('root'))
} 

else if (isUserLoggedIn === 2){
    ReactDOM.render(<Login />, document.getElementById('root'))
}
else if (isUserLoggedIn === 3){
    ReactDOM.render(<UserPage />, document.getElementById('root'))
}
