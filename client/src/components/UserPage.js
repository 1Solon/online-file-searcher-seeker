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
        <div className="top">
            {/* TopBar */}
            <TopBar/>
            <div className="body">
                <div className="bodyColour">
                    <div className="row no-gutters">
                        <h1>Profile</h1>
                        <div className="col-md-5 no-gutters d-flex justify-content-center align-items-center">
                            <div className='ImageDiv'>
                                <img id="userImage1"src={image} alt="user1"/>
                                <br></br><br></br>
                                <Button>Change Image</Button>
                            </div>
                        </div>

                        <div className="col-md-7 no-gutters d-flex justify-content-center align-items-center">
                            <div className="UserDetailsDiv">
                                <div className="Titles">
                                    <h3>UserDetails</h3>
                                </div>    

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h6 className="mb-0">Firstname:</h6>
                                        </div>

                                        <div className="col-md-9">
                                            Jeff
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="row">
                                        <div className="col-md-3">
                                            <h6 className="mb-0">Lastname:</h6>
                                        </div>

                                        <div className="col-md-9">
                                            Kisses
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="row">
                                        <div className="col-md-3">
                                            <h6 className="mb-0">Username:</h6>
                                        </div>

                                        <div className="col-md-9">
                                            Doggo44
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="row">
                                        <div className="col-md-3">
                                            <h6>Email:</h6>
                                        </div>

                                        <div className="col-md-9">
                                            Doggo44@amazon.com
                                        </div>
                                    </div>
                                    <hr />
                                    
                                    <div id="backgroundPopup"></div>
                                    <Row className="FormBtn">
                                        <FormPopup/>
                                    </Row>
                                </div>   
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className='sidebarDiv'>
                        <SideBar/>
                    </div> 
                </div>
            </div>
        </div>
        )
    }
}

export default UserPage