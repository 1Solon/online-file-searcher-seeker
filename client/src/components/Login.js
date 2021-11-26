import './styles/Login.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    const nav = useNavigate()

    let userID = -1

    axios.defaults.withCredentials = true;
    
    const sendRegister = () => {
        nav('/register')
    }
    
    const login = () => {
        axios.post('/api/login', {
            username: username,
            password: password,
        }).then((response) => {
            if(userID = 1) {
            //   setLoginStatus(response.data.message);
              nav('/homepage')
            } else {
            //   setLoginStatus(response.data[0].username);
                nav('/login')
            }
          });
      };

      useEffect(() => {
        axios.get('api/session').then((response) => {
          userID = response.data.id
          if(userID == 1) {
              nav('/homepage')
          }
        });
      }, []);

    return(
        <section id="entry-page">
            <form className="loginForm">
                <h2>Welcome Back!</h2>
                <fieldset>
                <legend>Log In</legend>
                <ul>
                    <li>
                        <label htmlFor="username">Username:</label>
                        <input name="setUsername" type="text" id="username" onChange={(e) => {setUsername(e.target.value);}} required/>
                    </li>
                    <li>
                        <label htmlFor="password">Password:</label>
                        <input name="setPassword" type="password" id="password" onChange={(e) => {setPassword(e.target.value);}} required/>
                    </li>
                    <li>
                        <i/>
                            {/* <a onClick={ () => changeView("PWReset")} href="#">Forgot Password?</a> */}
                        </li>
                </ul>
                </fieldset>
                <button type="button" onClick={login} >Login</button>
                <button type="button" onClick={() => sendRegister()}>Create an Account</button>
            </form>
        </section>   
    )
}