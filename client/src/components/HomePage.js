import React, { Component, useState, useEffect } from "react";
import "./styles/HomePage.css";
import axios from "axios";
import { Button, Row } from "react-bootstrap";
import { TopBar } from "./TopBar";
import { SideBar } from "./SideBar";
import { Footer } from "./Footer";
import { useNavigate } from 'react-router-dom'


export default function HomePage() {
  const [selectedFile, onFileChange] = useState("")
  
  const nav = useNavigate()
  
  axios.defaults.withCredentials = true;

  useEffect(() => {  
    axios.get('api/session').then((response) => {
      let isSession = response.data.isSession
      localStorage.setItem('id', response.data.id)
      localStorage.setItem('username', response.data.name);
      localStorage.setItem('email', response.data.email);
      if(!isSession) {
          nav('/login')
      }
      else{
        nav('/homepage')
      }
    });
  }, []);

  let onFileUpload = () => {
    axios.get("api/session").then(resp => {
      let userID = resp.data.id

      console.log('a file called: ' + selectedFile.name + ' has been uploaded under the user ID: ' + userID);

      axios.post("api/uploadfile", { 
        fileName : selectedFile.name,
        userID : userID,
        file : selectedFile
      });
    })
  }; 

  return (
    <div className="HomePageDiv">
      {/* TopBar */}
      <div className="topBar">
        <TopBar />
      </div>

        <Row className='file'>
          <input type="text" placeholder="Search"></input>
          <i className='bx bx-search'></i>
          
          <Row>
          <div id="col1" className="col-md-6">
            <input className="ChooseFile" type='file' onChange={(e) => {onFileChange(e.target.files[0])}} />
            <Button className='uploadBtn' onClick={(e) => {onFileUpload()}} ><i className='bx bx-upload'></i>Upload</Button>
          </div>
          </Row>
        </Row>

        {/* <div className='file'>

      {/* Sidebar */}
      <div className="sidebarDiv">
        <SideBar />
      </div>

      {/* Footer */}
      <div className="FooterDiv">
        <Footer />
      </div>
    </div>
  );
}
