import React, { Component } from 'react'
import './styles/TopBar.css'
import image from './images/Logo.png'
import {Col} from 'react-bootstrap'

export class TopBar extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
        <div className="TopBar">
            <Col className="leftTopbar"></Col >
            <Col className="rightTopbar">
                <div className="vl"></div>
                <a id="userLink" href="http://localhost:3000/userpage">
                  <img id="circularUser"src={image} alt="user1"/>
                </a>
                <a id="userLink2" href="http://localhost:3000/userpage">
                  <p id="userName">{localStorage.getItem('username')}</p>
                </a>
            </Col>
        </div>
        )
    }
}

export default TopBar