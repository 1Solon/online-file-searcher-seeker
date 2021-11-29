import React, { Component } from "react"
import "./styles/Footer.css"
import axios from "axios"
import { Card, Button, Row, Col } from "react-bootstrap"

export class CardDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      getData: [],
    }
  }

  componentDidMount() {
    // Grabs data from the database, then stores it locally as an array. This allows us to freely edit the array without compromising the data store and easily work with said data.
    axios.get("api/get-files").then((response) => {
      this.setState({
        getData: response.data,
      })
    })
  }

  downloadFile(filePath, fileName) {
    /* 
    Handles the logic for downloading, this function take a path from our cards and directs a get request to our (express) statically stored files.
    This function requests express to return the file as a denatured blob to facilitate transfer, which we then re-renature with the original
    filename and the original extension stored in our database. I admit this is a rather horrible way to implement this functionality, 
    not to mention potentially unsafe, but I judged that our already internally modified file names would prevent unauthorised access to user files. - Saul
    */
    axios({
      url: `api/${filePath}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", fileName)
      link.style.display = "none"
      document.body.appendChild(link)
      link.click()
    })
  }

  render() {
    /* 
    This generates the cards which we display on the main page, this takes from our getData array and generates nicely styled react-bootstrap cards.
    Our search functionality is based on a localstore value, returned from our homepage, which contains a term which we check every getData entry by,
    we then display whatever card satisfies this search term.
    */
    let card = this.state.getData.map((val, key) => {
      if (val.FILE_NAME.includes(localStorage.getItem("searchTerm"))) {
        return (
          <React.Fragment>
            <Card className="m-2">
              <Card.Body>
                <Card.Text>
                  <Row className="row g-4">
                    <Col className="col-md-8">{val.FILE_NAME}</Col>

                    <Col className="download col-md-2">
                      <Button
                        onClick={() => {
                          // See download logic comment
                          this.downloadFile(val.FILE_PATH, val.FILE_NAME)
                        }}
                      >
                        Download
                      </Button>
                    </Col>

                    <Col className="delete col-md-2">
                      <Button
                        className="deleteBtn"
                        onClick={() => {
                          // Calls delete file, which deletes our file from the database and the local store. Check index.js on the server for details.
                          axios
                            .post("api/delete-file", { fileID: val.FILE_ID })
                            .then(window.location.reload())
                        }}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </React.Fragment>
        )
      }
    })
    return card
  }
}
export default CardDisplay
