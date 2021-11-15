import React, { Component } from 'react'
import './styles/UserPage.css'
import image from './images/user1.jpeg'
import {SideBar} from './SideBar'
import {FormPopup} from './FormPopup'
import { Button,Row} from 'react-bootstrap'
import {TopBar} from './TopBar'

export class UserPage extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
        <div className="body">
            <TopBar/>
            <div className="bodyColour">
                <div className="row no-gutters">
                    <h1>Profile</h1>
                    <div className="col-md-6 no-gutters d-flex justify-content-center align-items-center">
                        <div className='ImageDiv'>
                            <img id="userImage1"src={image} alt="user1"/>
                            <br></br><br></br>
                            <Button>Change Image</Button>
                        </div>
                    </div>

                    <div className="col-md-6 no-gutters d-flex justify-content-center align-items-center">
                        <div className="UserDetailsDiv">
                            <div className="Titles">
                                <h3>UserDetails</h3>
                            </div>         
                            
                            <div className="leftDetails">
                                <div id="top">
                                    <p>Email:</p>
                                    <p>test@test.com</p>
                                </div>

                                <div id="bot">
                                    <p>Username:</p>
                                    <p>Doggo44</p>
                                </div>
                            </div>

                            <div className="rightDetails">
                                <div id="top">
                                    <p>Firstname:</p>
                                    <p>Mark</p>
                                </div>

                                <div id="bot">
                                    <p>Lastname:</p>
                                    <p>Williams</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div  className="row no-gutters">
                    <div className="col-md-12 no-gutters d-flex justify-content-center align-items-center">
                        <div className="FilesDiv">
                            <div className="Titles">
                                <h3>Files</h3>
                            </div>
                            <p>file1</p>
                            <p>file2</p>
                        </div>
                    </div>
                </div>
                <div id="backgroundPopup"></div>
                    <Row className="FormBtn">
                        <FormPopup/>
                    </Row>

                {/* Sidebar */}
                <div className='sidebarDiv'>
                    <SideBar/>
                </div> 
            </div>
        </div>
        )
    }
}

export default UserPage