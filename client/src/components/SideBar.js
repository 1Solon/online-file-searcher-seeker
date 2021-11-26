import React, { Component } from 'react'
import image from './images/Logo2.png'
import {Button} from 'react-bootstrap' 

export class SideBar extends Component {
  constructor(props) {
    super(props)
  }



  render(){
    return(
      <div id="SidebarComponent">
        <i className='bx bx-menu' id="btn"></i>
        
        <div className="logo">
          <img className="logoImg"src={image} alt="Logo2"/>
          {/* <h1 className="logoName">Seeker</h1> */}
        </div>
        
        <ul className="navList">
          {/* <li id='search_li'>
            <i className='bx bx-search-alt'></i>
            <input type="text" placeholder="Search" id="search"></input>
            <span id="tooltip">Search</span>
          </li> */}

          <li>
            <a href="http://localhost:3000/homepage">
              <i className='bx bx-home'></i>
              <span>Home</span>
            </a>
            <span id="tooltip">Home</span>
          </li>

          {/* <li>
            <a href="#">
              <i className='bx bx-star' ></i>
              <span>Starred</span>
            </a>
            <span id="tooltip">Starred</span>
          </li> */}

          {/* open a new menu (to sort) */}
          {/* <li>
            <i className='bx bx-sort' ></i>
            <span>Sort</span>
            <span id="tooltip">Sort</span>
          </li> */}

          <li>
            <a href="http://localhost:3000/userpage">
              <i className='bx bx-user'></i>
              <span>Account</span>
            </a>
            <span id="tooltip">Account</span>
          </li>
          
          <li>
            <a onClick={() => console.log('Hola Abraham')} href="http://localhost:3000/login"><i className='bx bx-log-out'></i></a>
            <span className="Logout">Log out</span>
            <span id="tooltip">Log out</span>
          </li>
        </ul>
      </div>
    )
  }
}
