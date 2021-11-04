import React, { Component } from 'react';
import './styles/HomePage.css';
import axios from 'axios';
import { Button, Card, Row } from 'react-bootstrap'
import {SideBar} from './SideBar';

class HomePage extends Component {
  // Creates an object that our DB returns, so we can access our DB table like a normal JS object
  constructor(props) {
    super(props)
    this.state = {
      setBookName: '',
      setReview: '',
      fetchData: [],
      reviewUpdate: ''
    }
  }

  // Defines the update state, this is required for us to run sql update requests, but I don't really understand it
  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value
    this.setState({
      [nam]: val
    })
  }

  // Defines the insert state, this is required for us to run sql update requests, but I don't really understand it
  handleChange2 = (event) => {
    this.setState({
      reviewUpdate: event.target.value
    })
  }

  // This runs immediatly when App.js is added to Index.js, so it grabs all the data we need in the object we defined above
  componentDidMount() {
    axios.get("/api/get")
    .then((response) => {
      this.setState({
        fetchData: response.data
      })
    })
  }

  // This links with our submit request on the server, so we can trigger that action from the client
  submit = () => {
    axios.post('/api/insert', this.state)
    .then(() => { alert('success post') })
    console.log(this.state)
    document.location.reload();
  }

  // This links with our delete request on the server, so we can trigger that action from the client
  delete = (id) => {
    if (window.confirm("Do you want to delete? ")) {
      axios.delete(`/api/delete/${id}`)
      document.location.reload()
    }
  }

  // This links with our edit request on the server, so we can trigger that action from the client
  edit = (id) => {
    axios.put(`/api/update/${id}`, this.state)
    document.location.reload();
  } 

  // This actually renders the App.js, I just copied a React template here
  // The part immediatly below this handles the list in our app, I think we can reuse this for our documents later
  render() {
    this.state.fetchData = Array.from(this.state.fetchData);
    let card = this.state.fetchData.map((val, key) => {
      return (
        <React.Fragment>
          <Card className='border-dark mb-2'>
              <Card.Header as="h6">{val.book_name}</Card.Header>
              <Card.Body>
                  <Card.Text>
                      {val.book_review}
                  </Card.Text>
              <Button id='deleteBtn' onClick={() => { this.delete(val.id) }}>Delete</Button>
            </Card.Body>
          </Card>
        </React.Fragment>
      )
    })

    return (
      <div className='HomePage'>
        
        {/* <div className='form'>
          <input name='setBookName' placeholder='Enter Book Name' onChange={this.handleChange} />
          <input name='setReview' placeholder='Enter Review' onChange={this.handleChange} />
          <Button className='my-2' variant="primary" onClick={this.submit}>Submit</Button>
        </div> */}

        <div className='file'>
          <h1>Seeker</h1>
          <Row>{card}</Row>
        </div>

        {/*Sidebar*/}
        <div className='sidebarDiv'>
          <SideBar/>
        </div>
      </div>
    );
  }
}
export default HomePage;