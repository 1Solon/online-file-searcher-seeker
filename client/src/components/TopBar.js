import React, { Component } from 'react'
import './styles/TopBar.css'
import image from './images/user1.jpeg'
import {Row, Col } from 'react-bootstrap'

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
                <img id="circularUser"src={image} alt="user1"/>
                <p>userName</p>
            </Col>
        </div>
        )
    }
}

export default TopBar