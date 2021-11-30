import React, { Component } from 'react'
import './styles/Footer.css'
import {Row, Col} from 'react-bootstrap'

/*
Footer is depreciated! We decided not to use it - Saul
Homepage looked a bit too overcrowded
*/

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

      </footer>
    )
  }
}

export default Footer