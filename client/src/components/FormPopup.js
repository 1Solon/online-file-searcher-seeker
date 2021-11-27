import React, { useState } from 'react'
import './styles/FormPopup.css'
import { Button, Row, Col } from 'react-bootstrap'
import axios from "axios";


export function FormPopup(){
    const [updateUsername, setUsername] = useState("");
    const [updatePassword, setPassword] = useState("");
    
    axios.defaults.withCredentials = true;
    
    const updateDetails = () => {
        console.log('NewPassword: ', updatePassword)
        axios.post('/api/update-detials', {
            userId: localStorage.getItem('id'),
            updatePassword: updatePassword
        }).then((response) =>{
            console.log(response);
            if(!response.data){
                alert("ERROR. Make sure a new password is entered")
            }
            else{
                alert("Your password has been updated successfully")
            }
        })
    }

    return(
        <div className="form">
            <Button className="Btn2">Change Details</Button>

            <div id="popup">
                <Row className="row1">
                    <h1>Change Details</h1>
                    {/* <Col>
                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email"></input>
                    </Col> */}

                    <Col>
                        <label htmlFor="user"><b>Username</b></label>
                        <input type="text" placeholder={localStorage.getItem('username')} id="updateUsername" disabled></input>
                    </Col>
                </Row>
                <Row className="row1">
                    {/* <Col>
                        <label htmlFor="FName"><b>Firstname</b></label>
                        <input type="text" placeholder="Enter Firstname"></input>
                    </Col> */}
                    <Col>
                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" required='true ' id="updatePassword" onChange={(e) => {setPassword(e.target.value);}}></input>
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
