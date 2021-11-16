import React, { Component } from 'react'
import './styles/Footer.css'
import {Row, Col} from 'react-bootstrap'

export class Footer extends Component {
  constructor(props) {
    super(props)
  }

render(){
    return(
      <footer className="footer">
        <Row className="row">
          <Col id="col1" className="col-md-6 d-flex justify-content-center align-items-center">
            <h2><b>Services</b></h2>
          </Col>

          <Col id="col1" className="col-md-6 d-flex justify-content-center align-items-center">
          <h2><b>About</b></h2>
          </Col>
        </Row>

        <Row>
          <Col id="col2" className="col-md-6 d-flex justify-content-center align-items-center">
            <ul className="leftUL">
              <li>Front-end</li>
              <li>Back-end</li>
            </ul>
          </Col>

          <Col id="col2" className="col-md-6 d-flex justify-content-center align-items-center">
            <ul className="rightUL">
              <li>Seeker</li>
              <li>Team</li>
            </ul>
          </Col>
        </Row>
          
        <Row>
          <Col id="col3" className="col-md-3 no-gutters d-flex justify-content-center align-items-center">
            <i className='bx bxl-facebook'></i>
          </Col>

          <Col id="col3" className="col-md-3 no-gutters d-flex justify-content-center align-items-center">
            <i className='bx bxl-twitter' ></i>
          </Col>

          <Col id="col3" className="col-md-3 no-gutters d-flex justify-content-center align-items-center">
            <i className='bx bxl-snapchat' ></i>
          </Col>

          <Col id="col3" className="col-md-3 no-gutters d-flex justify-content-center align-items-center">
            <i className='bx bxl-instagram' ></i>
          </Col>
        </Row>  
        

        {/* <Col id="col4" className="col-md-12 no-gutters d-flex justify-content-center align-items-center">
          <p className="copyright">N.Alvarez / S.Burges / A.Izarra Copyright</p>
        </Col> */}

      </footer>
    )
  }
}

export default Footer