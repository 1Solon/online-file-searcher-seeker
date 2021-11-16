import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

export class SideBar extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <div id="SidebarComponent">
        <i className='bx bx-menu' id="btn"></i>
        
        <div className="logo">
          <i className='bx bxl-docker'></i>
          <h1 className="logoName">Seeker</h1>
        </div>
        
        <ul className="navList">
          <li id='search_li'>
            <i className='bx bx-search-alt'></i>
            <input type="text" placeholder="Search" id="search"></input>
            <span id="tooltip">Search</span>
          </li>

          <li>
            <a href="https://www.google.com/?client=safari">
              <i className='bx bx-home'></i>
              <span>Home</span>
            </a>
            <span id="tooltip">Home</span>
          </li>

          <li>
            <a href="#">
              <i className='bx bx-star' ></i>
              <span>Starred</span>
            </a>
            <span id="tooltip">Starred</span>
          </li>

          <li>
            {/* open a new menu (to sort) */}
            <i className='bx bx-sort' ></i>
            <span>Sort</span>
            <span id="tooltip">Sort</span>
          </li>

          <li>
            {/* <Router>
              <div>
                <Link to="/userpage" exact></Link>
              </div>

              <Switch>
                <Route path="/userpage" exact>
                  <UserPage/>
                </Route>
              </Switch>
            </Router> */}

            <a href="#">
              <i className='bx bx-user'></i>
              <span>Account</span>
            </a>
            <span id="tooltip">Account</span>
          </li>
          
          <li>
            <a href="#">
              <i className='bx bx-log-out'></i>
              <span>Log out</span>
            </a>
            <span id="tooltip">Log out</span>
          </li>
        </ul>
      </div>
    )
  }
}
