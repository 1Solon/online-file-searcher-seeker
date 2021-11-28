import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import image from './images/Logo.png'
import axios from "axios";

export class SideBar extends Component {
  constructor(props) {
    super(props)
  }

  removeSession(){
    axios.get('/api/delete-session', {})
  }

  render(){
    return(
      <div id="SidebarComponent">
        <i className='bx bx-menu' id="btn"></i>
        
        <div className="logo">
          <img className="logoImg"src={image} alt="Logo"/>
        </div>
        
        <ul className="navList">
          <li>
            <a href="http://localhost:3000/homepage">
              <i className='bx bx-home'></i>
              <span>Home</span>
            </a>
            <span id="tooltip">Home</span>
          </li>

          <li>
            <a href="http://localhost:3000/userpage">
              <i className='bx bx-user'></i>
              <span>Account</span>
            </a>
            <span id="tooltip">Account</span>
          </li>

          <li>
            <a onClick={this.removeSession} href="http://localhost:3000/login"><i className='bx bx-log-out'></i></a>
            <span className="Logout">Log out</span>
            <span id="tooltip">Log out</span>
          </li>
        </ul>
      </div>
    )
  }
}
