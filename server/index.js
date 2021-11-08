const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express()

const cookieParser = require("cookie-parser");
const sessions = require('express-session');


const bcrypt = require('bcrypt') // Password incription -> For t his to work install npm install bcrypt inside the api container
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

// Session express middleware
app.use(
  sessions({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// Parsing the incoming data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// cookie parser middleware
app.use(cookieParser());

var session;

// Sets a response on our server, so we can test if the server is alive or not
app.get('/', (req, res) => {
  res.send('I am alive!')
})

// Handles adding a user to the database to the DB -> Registering user + encrypting password
app.post("/register", (req, res) => {
  const setUserName = req.body.setUsername
  const setEmail = req.body.setEmail
  const setPassword = req.body.setPassword

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
  const setUserName = req.query.setUserName
  const setPassword = req.query.setPassword

  db.query("SELECT * FROM USERS WHERE USER_NAME = ?", setUserName, (err, result) => {
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

// Starts the listener so we can communicate with the other services
app.listen('3001', () => { })