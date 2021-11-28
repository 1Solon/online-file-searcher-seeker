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
            let isSession = response.data.isSession
            if(!isSession) {
                nav('/login')
            }
        });
    }, []);

    const removeSession = ()  => {
        // alert("Are you sure?")
        window.confirm("Press a button!")
        // if
            // console.log('Thing was saved to the database.')
        
        // else{
        //     // Do nothing!
        //     console.log('Thing was not saved to the database.');
        // }
        
        // confirm('Are you sure you want to save this thing into the database?')) {
        //     // Save it!
        //     console.log('Thing was saved to the database.');
        //   } else {
        //     // Do nothing!
        //     console.log('Thing was not saved to the database.');
        //   }
        // axios.get('/api/delete-session', {})
    }

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
                                            <h6 className="mb-0">Username:</h6>
                                        </div> 
                                         <div className="col-md-9">
                                            {/* Doggo44 */}
                                            {localStorage.getItem('username')}
                                        </div>
                                    </div>
                                    <hr/>

                                    <div className="row">
                                        <div className="col-md-3">
                                            <h6 className="mb-0">Email:</h6>
                                        </div>

                                        <div className="col-md-9">
                                            {/* Doggo44 */}
                                            {localStorage.getItem('email')}
                                        </div>
                                    </div>
                                    <hr/>

                                    <div className="row">
                                        <div className="col-md-3">
                                            <h6>Password:</h6>
                                        </div>

                                        <div className="col-md-9">
                                            ***************
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <Button className="deleteUser" onClick={(e) => {removeSession()}}>Delete User</Button>
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