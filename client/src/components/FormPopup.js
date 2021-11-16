import React, { Component } from 'react'
import './styles/FormPopup.css'
import {Button, Row, Col} from 'react-bootstrap'

export class FormPopup extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
        <div className="form">
            <Button className="Btn2">Change Details</Button>

            <div id="popup">
                <Row className="row1">
                    <h1>Change Details</h1>
                    <Col>
                        <label for="email"><b>Email</b></label>
                        {/*  */}
                        {/*  */}
                        {/* if empty we would just not do anything with it or get the userdata from the session */}
                        {/*  */}
                        {/*  */}
                        <input type="text" placeholder="Enter Email"></input>
                    </Col>

                    <Col>
                        <label for="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password"></input>
                    </Col>
                </Row>

                <Row className="row1">
                    <Col>
                        <label><b>Firstname</b></label>
                        <input type="text" placeholder="Enter Firstname"></input>
                    </Col>

                    <Col>
                        <label><b>Username</b></label>
                        <input type="text" placeholder="Enter Username"></input>
                    </Col>
                </Row>
                        
                <Row className="row2">
                    <Button type="submit" className="btn">Save</Button>
                    <Button type="button" className="closeBtn">Close</Button>
                </Row>

            </div>
        </div>        
  
        )
    }
}
