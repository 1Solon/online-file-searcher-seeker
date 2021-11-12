import './styles/Login.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export default function Login() {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [emailReg, setEmailReg] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    const nav = useNavigate()

    var currentView = 'LogIn'

    axios.defaults.withCredentials = true;

    const changeView = (view) => {
        currentView = view
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
    
    const login = () => {
        axios.post('/api/login',{
            username: username,
            password: password,
        }).then((response) => {
            if(!response.data.message) {
              setLoginStatus(response.data.message);
              nav('/homepage')
            } else {
              setLoginStatus(response.data[0].username);
            }
          });
      };

    useEffect(() => {
        axios.get('api/login').then((response) => {
          if (response.data.loggedIn == true) {
            setLoginStatus(response.data.user[0].username);
            nav('/homepage')
          }
        });
    }, []);

    return (
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
                    <a onClick={ () => changeView("PWReset")} href="#">Forgot Password?</a>
                    </li>
                </ul>
                </fieldset>
                <button type="button" onClick={login} >Login</button>
                <button type="button" onClick={() => changeView("SignUp")}>Create an Account</button>
            </form>
        </section>
    )

    // switch(currentView){
    //     case 'SignUp':
    //         return (
    //             <form className="loginForm">
    //                 <h2>Sign Up!</h2>
    //                 <fieldset>
    //                 <legend>Create Account</legend>
    //                 <ul>
    //                     <li>
    //                     <label htmlFor="username">Username:</label>
    //                     <input name="setUsername" type="text" id="username" onChange={(e) => {setUsernameReg(e.target.value);}}required/>
    //                     </li>
    //                     <li>
    //                     <label htmlFor="email">Email:</label>
    //                     <input name="setEmail" type="email" id="email"  onChange={(e) => {setEmailReg(e.target.value);}}required/>
    //                     </li>
    //                     <li>
    //                     <label htmlFor="password">Password:</label>
    //                     <input name="setPassword" type="password" id="password" onChange={(e) => {setPasswordReg(e.target.value);}}required/>
    //                     </li>
    //                 </ul>
    //                 </fieldset>
    //                 <button type="submit" onClick={register}>Submit</button>
    //                 <button type="button" onClick={() => changeView("LogIn")}>Have an Account?</button>
    //             </form>
    //         );
    //     case 'LogIn':
    //         return (
    //             <form className="loginForm">
    //               <h2>Welcome Back!</h2>
    //               <fieldset>
    //                 <legend>Log In</legend>
    //                 <ul>
    //                   <li>
    //                     <label htmlFor="username">Username:</label>
    //                     <input name="setUsername" type="text" id="username" onChange={(e) => {setUsername(e.target.value);}} required/>
    //                   </li>
    //                   <li>
    //                     <label htmlFor="password">Password:</label>
    //                     <input name="setPassword" type="password" id="password" onChange={(e) => {setPassword(e.target.value);}} required/>
    //                   </li>
    //                   <li>
    //                     <i/>
    //                     <a onClick={ () => changeView("PWReset")} href="#">Forgot Password?</a>
    //                   </li>
    //                 </ul>
    //               </fieldset>
    //               <button type="button" onClick={login} >Login</button>
    //               <button type="button" onClick={() => changeView("SignUp")}>Create an Account</button>
    //             </form>
    //         )
    // }
}