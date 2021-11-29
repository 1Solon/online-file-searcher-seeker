import React, { useState } from 'react'
import './styles/FormPopup.css'
import { Button, Row, Col } from 'react-bootstrap'
import axios from "axios";
import { useNavigate } from 'react-router-dom'

export function FormPopup(){
    const [updateUsername, setUsername] = useState("");
    const [updatePassword, setPassword] = useState("");

    const nav = useNavigate()

    axios.defaults.withCredentials = true;
    
    const updateDetails = () => {
        axios.post('/api/update-detials', {
            userId: localStorage.getItem('id'),
            updateUsername: updateUsername,
            updatePassword: updatePassword
        }).then((response) =>{
            if(!response.data){
                alert("ERROR. Make sure a new user and/or password is entered")
            }
            else{
                alert("Your password/username has been updated successfully")
                axios.get('/api/delete-session', {})
                nav('/login')
            }
        })
    }

    return(
        <div className="form">
            <Button className="Btn2">Change Details</Button>

            <div id="popup">
                <Row className="row1">
                    <h1>Change Details</h1>
                    <Col>
                        <label htmlFor="user"><b>Username</b></label>
                        <input type="text"  defaultValue={localStorage.getItem('username')} id="updateUsername" onChange={(e) => {setUsername(e.target.value);}}></input>
                    </Col>
                </Row>
                
                <Row className="row1">
                    <Col>
                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter new password" id="updatePassword" onChange={(e) => {setPassword(e.target.value);}}></input>
                    </Col>
                </Row>
                        
                <Row className="row2">
                    <Button type="submit" onClick={updateDetails} className="btn">Save</Button>
                    <Button type="button" className="closeBtn">Close</Button>
                </Row>

            </div>
        </div>       
    )
}
