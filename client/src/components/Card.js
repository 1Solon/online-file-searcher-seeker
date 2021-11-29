import React, { Component } from 'react'
import './styles/Footer.css'
import axios from "axios";
import {Card, Button, Row, Col} from 'react-bootstrap'

export class CardDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
        getData: []
    }
  }

  componentDidMount(){
    axios.get("api/get-files").then((response) => {
        this.setState({
            getData: response.data
        })
    })
  }

  render(){
      let card = this.state.getData.map((val, key) => {
        return (
        <React.Fragment>
            <Card className='m-2'>
                <Card.Body>
                    <Card.Text>
                      <Row className='row g-4'>
                        <Col className='col-md-8'>
                          {val.FILE_NAME}
                        </Col>

                        <Col className='download col-md-2'>
                          <Button className='downloadBtn'onClick={() => {}}>Download</Button>
                        </Col>

                        <Col className='delete col-md-2'>
                          <Button className='deleteBtn' onClick={() => {axios.post("api/delete-file", {fileID : val.FILE_ID }).then(window.location.reload())}}>Delete</Button>  
                        </Col>
                      </Row>

                    </Card.Text>
                    <Row>
                      {/* <Col>
                        <Button onClick={() => {axios.post("api/delete-file", {fileID : val.FILE_ID }).then(window.location.reload())}}>Delete</Button>
                      </Col>

                      <Col>
                        <Button onClick={() => {}}>Download</Button>
                      </Col> */}
                    </Row>
                </Card.Body>
            </Card>
        </React.Fragment>
        )
      })
      return(card)
  }
}
export default CardDisplay
