import React, { Component, useState } from "react";
import "./styles/HomePage.css";
import axios from "axios";
import { Button, Card, Row } from "react-bootstrap";
import { TopBar } from "./TopBar";
import { SideBar } from "./SideBar";
import { Footer } from "./Footer";

axios.defaults.withCredentials = true;

export default function HomePage() {
  const [selectedFile, onFileChange] = useState("")

  let onFileUpload = () => {
    let formData = ("myfile", selectedFile, selectedFile.name);

    axios.get("api/userID", )

    console.log(selectedFile.name + ' has sucessfully been uploaded to ');

    axios.post("api/uploadfile", formData);
  };

  return (
    <div className="HomePageDiv">
      {/* TopBar */}
      <div className="topBar">
        <TopBar />
      </div>

      <Row className="file">
        <input type="text" placeholder="Search"></input>
        <i className="bx bx-search"></i>

        <input type='file' onChange={(e) => {onFileChange(e.target.files[0])}} />
        
        <button onClick={() => {onFileUpload()}}> Upload </button>
      </Row>

      {/* <div className='file'>
          <Row>{card}</Row>
        </div> */}

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
