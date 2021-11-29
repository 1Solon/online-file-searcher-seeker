import React, { Component } from 'react'
import './styles/Footer.css'
import axios from "axios";
import {Card, Button} from 'react-bootstrap'

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
            <Card style={{ width: '18rem' }} className='m-2'>
                <Card.Body>
                    <Card.Text>
                        {val.FILE_NAME}
                    </Card.Text>
                    <Button onClick={() => {axios.post("api/delete-file", {fileID : val.FILE_ID }).then(window.location.reload())}}>Delete</Button>
                    <Button onClick={() => {}}>Download</Button>
                </Card.Body>
            </Card>
        </React.Fragment>
        )
      })
      return(card)
  }
}
export default CardDisplay
