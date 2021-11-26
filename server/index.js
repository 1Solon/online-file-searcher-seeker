const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const fs = require('fs')
const path = require('path')

const bcrypt = require('bcrypt') // Password incription -> For t his to work install npm install bcrypt inside the api container
const saltRounds = 10

const app = express()

// Handles our mySQL server connection
const db = mysql.createPool({
  host: 'mysql_db', 
  user: 'user', 
  password: 'seeker-user', 
  database: 'seekerDB'
})

// Enable cors, so we can serve the client with our SQL and our Server
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Parsing the incoming data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session express middleware
app.use(
  session({
    key: "userId",
    secret: "seeker",
    resave: true,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/session", (req, res) => {
  const raw = req.session.user
  let id = 0
  let name = ""
  let email = ""

  try{
    id = raw[0].USER_ID
    name = raw[0].USER_NAME
    email = raw[0].USER_EMAIL
    res.send({id, name, email})
  }
  catch(err){
    console.log('Estoy pasando por la sesion')
    res.send({id, name, email})
  }
})

// Handles adding a user to the database to the DB -> Registering user + encrypting password
app.post("/register", (req, res) => {
  const setUserName = req.body.username
  const setEmail = req.body.email
  const setPassword = req.body.password

  // Password encryption
  bcrypt.hash(setPassword, saltRounds, (err, hash) => {
    if(err){
      console.log(err)
      res.send({err: err})
    }
    db.query("INSERT INTO USERS (USER_NAME, USER_EMAIL, USER_PASSWORD) VALUES (?, ?, ?)", [setUserName, setEmail, hash], (err, result) => {
      if(err){
        console.log(err)
        res.send({ err: err })
      }
      else{
        console.log(result)
        res.send({ userCreated: true })
      }
    })
  })
})

// app.get("/login", (req, res) => {
//   if(req.session.user) {
//     res.send({ loggedIn: true, user: req.session.user });
//   } else {
//     res.send({ loggedIn: false });
//   }
// });

app.post("/login", (req, res) => {
  const username = req.body.username
  const password = req.body.password

  db.query('SELECT * FROM USERS WHERE USER_NAME = ?;', [username], (err, result) => {
    console.log(result);
    if (err) {
      res.send({ err: err });
    }
    if(result.length > 0) {
      bcrypt.compare(password, result[0].USER_PASSWORD, (error, response) => {
        console.log(response)
        if(response){
            console.log('OK')
            req.session.user = result
            console.log(req.session.user);
            res.send(result);
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

app.post("/uploadfile", (req, res) => {
  const setUserID = req.body.userID
  const setFileName = req.body.fileName
  const setFilePath = 'stub'

  // Gets current date
  var setFileCreation = new Date()
  var dd = String(setFileCreation.getDate()).padStart(2, '0')
  var mm = String(setFileCreation.getMonth() + 1).padStart(2, '0')
  var yyyy = setFileCreation.getFullYear()
  setFileCreation = yyyy + '-' + mm + '-' + dd

  // Creates a folder if it does not already exist, if it does exist, skip
  fs.mkdir(process.cwd() + '/seeker/files', { recursive : true }, (e) => {
    if (e) {
      console.error('Something has gone wrong: ', e)
    } else {
      console.log('Folder created sucessfully.')
    }
  })

  // Adds the uploaded file to the folder
  //TODO: https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp




  db.query('INSERT INTO FILE (USER_ID, FILE_NAME, FILE_CREATION, FILE_PATH) VALUES (?, ?, ?, ?)', 
  [setUserID, setFileName, setFileCreation, setFilePath], (err, result) => { console.log(result) })
})

// Starts the listener so we can communicate with the other services
app.listen('3001', () => { })