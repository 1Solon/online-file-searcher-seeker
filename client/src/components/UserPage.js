import React, { Component, useEffect } from 'react'
import './styles/UserPage.css'
import image from './images/user1.jpeg'
import {SideBar} from './SideBar'
import {FormPopup} from './FormPopup'
import { Button,Row} from 'react-bootstrap'
import {TopBar} from './TopBar'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

axios.defaults.withCredentials = true;

export default function UserPage(){
    const nav = useNavigate()   

    useEffect(() => {  
        axios.get('api/session').then((response) => {
            localStorage.setItem('username', response.data.name);
            localStorage.setItem('email', response.data.email);
            let isSession = response.data.isSession
            if(!isSession) {
                nav('/login')
            }
        });
    }, []);

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

                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <h6 class="mb-0">Username:</h6>
                                        </div> 
                                         <div class="col-md-9">
                                            {/* Doggo44 */}
                                            {localStorage.getItem('username')}
                                        </div>
                                    </div>
                                    <hr />

                                    <div class="row">
                                        <div class="col-md-3">
                                            <h6 class="mb-0">Email:</h6>
                                        </div>

                                        <div class="col-md-9">
                                            {/* Doggo44 */}
                                            {localStorage.getItem('email')}
                                        </div>
                                    </div>
                                    <hr/>

                                    <div class="row">
                                        <div class="col-md-3">
                                            <h6>Password:</h6>
                                        </div>

                                        <div class="col-md-9">
                                            ***************
                                        </div>
                                    </div>
                                    <hr/>
                                    
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