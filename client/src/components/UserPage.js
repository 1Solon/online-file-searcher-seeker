import React, { Component, useEffect, useState } from 'react'
import './styles/UserPage.css'
import {SideBar} from './SideBar'
import {FormPopup} from './FormPopup'
import { Button,Row} from 'react-bootstrap'
import {TopBar} from './TopBar'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import image from './images/Logo.png'

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

    // delete files from front end
    const deleteAllFiles = () => {
        axios.get("api/get-files").then((response) => {

            if (response.status.lenght === 0){
            }
            else{
                response.data.map((val) => {
                    axios.post("api/delete-file", {fileID : val.FILE_ID}).then((response) => {
                        console.log("delete file")
                    })
                })
            }
        })    
    }

    const deleteUser = ()  => {
        if(window.confirm("Are you sure you want to delete your account?")){
            deleteAllFiles() 
        
            // delete user
            axios.post('/api/delete-user', {userid: localStorage.getItem('id')}).then(console.log("Sucessfully deleted user"))
            
            // delete local storage
            localStorage.removeItem('id')
            localStorage.removeItem('username')
            localStorage.removeItem('email')
            localStorage.setItem('searchTerm', "")

            // Deletes session
            axios.get('/api/delete-session').then(console.log("Sucessfully deleted session"))

            // Reloads page
            window.location.reload()
        }
        else{
            console.log("false")
        }
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
                                <img id="userImage1" src={image} alt="user1"/>
                                <br></br><br></br>
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
                                    <hr/>
                                    
                                    <div>
                                        <Button className="deleteUser" onClick={(e) => {deleteUser()}}>Delete User</Button>
                                    </div>

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