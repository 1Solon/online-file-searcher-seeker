
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

const bcrypt = require('bcrypt'); // Password incription -> For t his to work install npm install bcrypt inside the api container
const saltRounds = 10


// Handles our mySQL server connection
const db = mysql.createPool({
  host: 'mysql_db', 
  user: 'user', 
  password: 'seeker-user', 
  database: 'seekerDB'
})

// Enable cors, so we can serve the client with our SQL and our Server
app.use(cors())

// Starts our express server
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Sets a response on our server, so we can test if the server is alive or not
app.get('/', (req, res) => {
  res.send('I am alive!')
});

// Handles adding a user to the database to the DB -> Registering user + encrypting password
app.post("/register", (req, res) => {
  const setUserName = req.body.setUsername;
  const setEmail = req.body.setEmail;
  const setPassword = req.body.setPassword;

  // Password encryption
  bcrypt.hash(setPassword, saltRounds, (err, hash) => {
    if(err){
      console.log(err)
    }
    db.query("INSERT INTO USERS (USER_NAME, USER_EMAIL, USER_PASSWORD) VALUES (?, ?, ?)", [setUserName, setEmail, hash], (err, result) => {
      console.log(result)
    })
  })
})

app.post("/login", (req, res) => {
  const setUserName = req.query.setUserName;
  const setPassword = req.query.setPassword;

  db.query("SELECT * FROM USERS WHERE USER_NAME = ?;", setUserName, (err, result) => {
    if(result.length > 0) {
      bcrypt.compare(setPassword, result[0].password, (error, response) => {
        if(response){
          res.send(result)
        }
        else{
          res.send({message: "Wrong username or password combination!"})
        }
      })
    }
    else{
      res.send({message: "User does not exist"})
    }
  })
})

// Handles deleting an element from the DB
// app.delete("/delete/:bookId", (req, res) => {
//   const bookId = req.params.bookId;
//   const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";
//   db.query(DeleteQuery, bookId, (err, result) => {
//     if (err) console.log(err);
//   })
// })

// Handles updating an element from the DB
// app.put("/update/:bookId", (req, res) => {
//   const bookReview = req.body.reviewUpdate;
//   const bookId = req.params.bookId;
//   const UpdateQuery = "UPDATE books_reviews SET book_review = ? WHERE id = ?";
//   db.query(UpdateQuery, [bookReview, bookId], (err, result) => {
//     if (err) console.log(err)
//   })
// })

// Starts the listener so we can communicate with the other services
app.listen('3001', () => { })