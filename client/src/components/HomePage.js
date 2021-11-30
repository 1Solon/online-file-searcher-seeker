import React, { useState, useEffect } from "react"
import "./styles/HomePage.css"
import axios from "axios"
import { Button, Row } from "react-bootstrap"
import { TopBar } from "./TopBar"
import { SideBar } from "./SideBar"
import { CardDisplay } from "./Card"
import { useNavigate } from "react-router-dom"

/*
 HomePage.js is the central page of Seeker, it displays cards and handles the various functions of the program
*/
export default function HomePage() {
  const [selectedFile, onFileChange] = useState("")

  // Defines route
  const nav = useNavigate()

  axios.defaults.withCredentials = true
  
  // This useffect redirects users who are not logged in away from homepage, this enforces our login system simply
  useEffect(() => {
    axios.get("api/session").then((response) => {
      let isSession = response.data.isSession
      localStorage.setItem("id", response.data.id)
      localStorage.setItem("username", response.data.name)
      localStorage.setItem("email", response.data.email)
      if (!isSession) {
        nav("/login")
      } else {
        nav("/homepage")
      }
    })
  }, [])

  // This handles the logic for our upload file button. It grabs a file from the input, then when the button is pressed, submits the file via axios
  let onFileUpload = () => {
    const formData = new FormData()
    formData.append("file", selectedFile)
    axios.post("api/uploadfile", formData).then((response) => {
      console.log(response)
      window.location.reload()
    })
    axios.get("api/get-files").then((response) => console.log(response))
  }

  return (
    <div className="HomePageDiv">
      {/* TopBar */}
      <div className="topBar">
        <TopBar />
      </div>

      <Row className="file">
        <input 
        type="text" 
        placeholder="Press 'Enter' to search, leave blank and hit 'Enter' to Reset"
        onKeyDown = {(e) => {if (e.key === 'Enter') {
          localStorage.setItem('searchTerm', e.target.value)
          window.location.reload()
        }}} 
        />

        <Row>
          <div id="col1" className="col-md-6">
            <input
              className="ChooseFile"
              type="file"
              onChange={(e) => {
                onFileChange(e.target.files[0])
              }}
            />
            <Button
              className="uploadBtn"
              onClick={(e) => {
                onFileUpload()
              }}
            >
              <i className="bx bx-upload"></i>Upload
            </Button>
          </div>
        </Row>

        {/* Files display */}
        <div className="cardDisplayDiv">
          <CardDisplay />
        </div>
      </Row>

      {/* Sidebar */}
      <div className="sidebarDiv">
        <SideBar />
      </div>

      {/* Footer Not being used*/}
      {/* <div className="FooterDiv">
        <Footer />
      </div> */}
    </div>
  )
}
