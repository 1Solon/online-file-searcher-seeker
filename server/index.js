const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express()

const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const parser = require('body-parser');


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
  // session=req.session;
  //   if(session.userid){
  //       res.send("Welcome User <a href=\'/logout'>click to logout</a>");
  //   }else
  //   res.sendFile('views/index.html',{root:__dirname})
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
  const username = req.body.username
  const password = req.body.username

  console.log("This is my username: " + req.body.username)
 
  console.log("I have gotten a login request")

  db.query('SELECT * FROM USERS WHERE USER_NAME = ?;', [username], (err, result) => {
    console.log(result);
    if(result.length > 0) {
      console.log("Hola: " + result[0].password)
      bcrypt.compare(password, result[0].password, (error, response) => {
        console.log(response)
        if(response){
            console.log('OK')
            // session = req.session
            // session.userid = req.body.username
            // console.log(req.session)
            // res.send("<a href='./client/src/components/HomePage.js'></a>")
            res.redirect('/HomePage')
        }
        else{
          res.send({message: "Wrong username or password combination!"})
          console.log("Login Failed!")
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