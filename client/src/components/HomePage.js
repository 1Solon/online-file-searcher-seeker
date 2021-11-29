import React, { Component, useState, useEffect } from "react";
import "./styles/HomePage.css";
import axios from "axios";
import { Button, Row } from "react-bootstrap";
import { TopBar } from "./TopBar";
import { SideBar } from "./SideBar";
import { Footer } from "./Footer";
import { CardDisplay } from "./Card";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [selectedFile, onFileChange] = useState("");

  const nav = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("api/session").then((response) => {
      let isSession = response.data.isSession;
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("username", response.data.name);
      localStorage.setItem("email", response.data.email);
      if (!isSession) {
        nav("/login");
      } else {
        nav("/homepage");
      }
    });
  }, []);

  let onFileUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios.post("api/uploadfile", formData).then((response) => {
      console.log(response);
      window.location.reload();
    });
    axios.get("api/get-files").then((response) => console.log(response));
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

        <Row>
          <div id="col1" className="col-md-6">
            <input
              className="ChooseFile"
              type="file"
              onChange={(e) => {
                onFileChange(e.target.files[0]);
              }}
            />
            <Button
              className="uploadBtn"
              onClick={(e) => {
                onFileUpload();
              }}
            >
              <i className="bx bx-upload"></i>Upload
            </Button>
          </div>
        </Row>
      </Row>

      <div className="cardDisplayDiv">
        <CardDisplay />
      </div>

      {/* Sidebar */}
      <div className="sidebarDiv">
        <SideBar />
      </div>

      {/* Footer */}
      <div className="FooterDiv">{/* <Footer /> */}</div>
    </div>
  );
}
