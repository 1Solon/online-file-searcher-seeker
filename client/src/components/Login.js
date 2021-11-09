import React, { Component } from 'react';
import './styles/Login.css';
import axios from 'axios';

axios.defaults.withCredentials = true;

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentView: "signUp",
      setEmail: '',
      setUsername: '',
      setPassword: '',
      fetchData: [],
    }
  }

  changeView = (view) => {
    this.setState({
      currentView: view
    })
  }

  handleChange = (event) => {
    console.log(this.state)
    let nam = event.target.name;
    let val = event.target.value
    this.setState({
      [nam]: val
    })
  }

  register = () => {
    axios.post('/api/register', this.state)
    .then(() => { alert('success post') })
    console.log(this.state)
    // document.location.reload();
  }

  login = () => {
    axios.post('/api/login',{
      username: this.state.setUsername,
      password: this.state.setPassword
    }).then(() => {alert('Successful post')})
    // document.location.reload()
  }

  currentView = () => {
    switch(this.state.currentView) {
      case "signUp":
        return (
          <form className="loginForm">
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label htmlFor="username">Username:</label>
                  <input name="setUsername" type="text" id="username" onChange={this.handleChange} required/>
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input name="setEmail" type="email" id="email" onChange={this.handleChange} required/>
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input name="setPassword" type="password" id="password" onChange={this.handleChange} required/>
                </li>
              </ul>
            </fieldset>
            <button type="submit" onClick={this.register}>Submit</button>
            <button type="button" onClick={ () => this.changeView("logIn")}>Have an Account?</button>
          </form>
        )
      case "logIn":
        return (
          <form className="loginForm">
            <h2>Welcome Back!</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label htmlFor="username">Username:</label>
                  <input name="setUsername" type="text" id="username" onChange={this.handleChange} required/>
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input name="setPassword" type="password" id="password" onChange={this.handleChange} required/>
                </li>
                <li>
                  <i/>
                  <a onClick={ () => this.changeView("PWReset")} href="#">Forgot Password?</a>
                </li>
              </ul>
            </fieldset>
            <button type="button" onClick={this.login} >Login</button>
            <button type="button" onClick={ () => this.changeView("signUp")}>Create an Account</button>
          </form>
        )
        // break
      // case "PWReset":
      //   return (
      //     <form className="loginForm">
      //     <h2>Reset Password</h2>
      //     <fieldset>
      //       <legend>Password Reset</legend>
      //       <ul>
      //         <li>
      //           <em>A reset link will be sent to your inbox!</em>
      //         </li>
      //         <li>
      //           <label for="email">Email:</label>
      //           <input type="email" id="email" required/>
      //         </li>
      //       </ul>
      //     </fieldset>
      //     <button>Send Reset Link</button>
      //     <button type="button" onClick={ () => this.changeView("logIn")}>Go Back</button>
      //   </form>
      //   )
      default:
        break
    }
  }

  render() {
    return (
      <section id="entry-page">
        {this.currentView()}
      </section>
    )
  }
}

export default Login;