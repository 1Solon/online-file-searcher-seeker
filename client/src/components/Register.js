import './styles/Login.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export default function Register(){
    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [emailReg, setEmailReg] = useState("")
    
    const nav = useNavigate()

    axios.defaults.withCredentials = true;

    const sendLogin = () => {
        nav('/login')
    }

    const register = () => {
        axios.post('/api/register', {
            username: usernameReg,
            email: emailReg,
            password: passwordReg,
        }).then(() => { alert('success post') })
        // console.log(this.state)
        // document.location.reload();
    }

    return (
        <section id="entry-page">
            <form className="loginForm">
                <h2>Sign Up!</h2>
                <fieldset>
                <legend>Create Account</legend>
                <ul>
                    <li>
                    <label htmlFor="username">Username:</label>
                    <input name="setUsername" type="text" id="username" onChange={(e) => {setUsernameReg(e.target.value);}}required/>
                    </li>
                    <li>
                    <label htmlFor="email">Email:</label>
                    <input name="setEmail" type="email" id="email"  onChange={(e) => {setEmailReg(e.target.value);}}required/>
                    </li>
                    <li>
                    <label htmlFor="password">Password:</label>
                    <input name="setPassword" type="password" id="password" onChange={(e) => {setPasswordReg(e.target.value);}}required/>
                    </li>
                </ul>
                </fieldset>
                <button type="submit" onClick={register}>Submit</button>
                <button type="button" onClick={() => sendLogin()}>Have an Account?</button>
            </form> 
        </section>
    )
}