const express = require('express')
const fileUpload = require('express-fileupload')
const mysql = require('mysql2')
const cors = require('cors')
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const fs = require('fs')
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
app.use(express.static('seeker/files'));
app.use(fileUpload())


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
  let isSession = false

  try {
    id = raw[0].USER_ID
    name = raw[0].USER_NAME
    email = raw[0].USER_EMAIL
    isSession = true
    res.send({isSession, id, name, email})
  }
  catch(err){
    res.send(isSession)
  }
})

app.get("/delete-session", (req, res) => {
  req.session.destroy()
})

//Handles retrieving files from the database
app.get("/get-files", (req, res) => {
  const getUserID = req.session.user[0].USER_ID
  
  db.query('SELECT * FROM FILE WHERE USER_ID = ?;', [getUserID], (err, result, fields) => {
    if(err){
      res.status(417).send('Error! The server could not complete get-files request')
      console.error(err)
    }
    else{
      console.log(result)
      res.send(result)
    }
  })
})

// Handles adding a user to the database to the DB -> Registering user + encrypting password
app.post("/register", (req, res) => {
  const setUserName = req.body.username
  const setEmail = req.body.email
  const setPassword = req.body.password

  // Password encryption
  bcrypt.hash(setPassword, saltRounds, (err, hash) => {
    if(err){
      res.send({err: err})
    }
    db.query("INSERT INTO USERS (USER_NAME, USER_EMAIL, USER_PASSWORD) VALUES (?, ?, ?)", [setUserName, setEmail, hash], (err, result) => {
      if(err){
        res.send({ userCreated: false })
      }
      else{
        console.log(result)
        res.send({ userCreated: true })
      }
    })
  })
})

app.post("/login", (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const isLogged = false

  db.query('SELECT * FROM USERS WHERE USER_NAME = ?;', [username], (err, result) => {
    console.log(result);
    if (err) {
      res.send({ err: err });
    }
    if(result.length > 0) {
      bcrypt.compare(password, result[0].USER_PASSWORD, (error, response) => {
        if(response){
            req.session.user = result
            res.send(result);
        }
        else{
          // res.send({message: "Wrong username or password combination!"})
          res.send(isLogged)
          console.log("Login Failed!")
        }
      })
    }
    else{
      // res.send({message: "User does not exist"})
      res.send(isLogged)
    }
  })
})

app.post('/update-detials', (req, res) => {
  const userId = req.body.userId
  let newUsername = req.body.updateUsername
  let newPassword = req.body.updatePassword
  let userUpdated = false
  let passCheck = false

  if(newUsername == ''){
    db.query('SELECT USER_NAME FROM USERS WHERE USER_ID = ?', [userId], (err, result) => {
      if(err){
        console.log(err)
        res.send(userUpdated)
      }
      else{       
        newUsername = result[0].USER_NAME
      }
    })
  }
  if(newPassword == ''){
    passCheck = true
    db.query('SELECT USER_PASSWORD FROM USERS WHERE USER_ID = ?', [userId], (err, result) =>{
      if(err){
        console.log(err)
        res.send(userUpdated)
      }
      else{
        newPassword = result[0].USER_PASSWORD
        console.log(newPassword)
      }
    })
  }

  if(!passCheck){
    bcrypt.hash(newPassword, saltRounds, (err, hash) => {
      if(err){
        res.send({err: err})
      }
      db.query("UPDATE USERS SET USER_NAME = ?, USER_PASSWORD = ? WHERE USER_ID = ?", [newUsername, hash, userId], (err, result) => {
        if(err){
          res.send({ err: err })
        }
        else{
          userUpdated = true
          res.send(userUpdated)
        }
      })
    })
  }
  else{
    db.query("UPDATE USERS SET USER_NAME = ? WHERE USER_ID = ?", [newUsername, userId], (err, result) => {
      if(err){
        console.log(err)
        res.send({ err: err })
      }
      else{
        console.log('Hello, ', newPassword)
        userUpdated = true
        res.send(userUpdated)
      }
    })
  }
})

app.post("/uploadfile", (req, res) => {
  const setUserID = req.session.user[0].USER_ID

  // Gets current date
  let setFileCreation = new Date()
  let dd = String(setFileCreation.getDate()).padStart(2, '0')
  let mm = String(setFileCreation.getMonth() + 1).padStart(2, '0')
  let yyyy = setFileCreation.getFullYear()
  setFileCreation = yyyy + '-' + mm + '-' + dd

  // Creates a folder if it does not already exist, if it does exist, skip
  fs.mkdir(process.cwd() + '/seeker/files', { recursive : true }, (e) => {
    if (e) {
      res.status(417).send('Error! The server could not create the file')
      console.error('Something has gone wrong: ', e)
    } else {
      console.log('Folder created sucessfully.')
    }
  })

  // Defines the file based on the post input
  const setFile = req.files.file
  
  //Splits the file name by extension, then adds a random number to the name to prevent file conflicts
  let editFileName = setFile.name
  let editFile = editFileName.split(".")
  editFile[0] += '-' + (Math.round((Math.random()*(9999-1)+1))).toString()
  editFileName = editFile.join('.')

  //Generates a file based on the upload
  setFile.mv(`${__dirname}/seeker/files/${editFileName}`, function (err) {
    if (err) {
      res.status(417).send('Error! The server could not write the file to the local store')
      console.error(err)
    }
  })

  // Grabs the name of the file for the DB query
  const setFileName = setFile.name
  console.log(setFileName)

  // Grabs the path of the file for the DB query
  const setFilePath = `/${editFileName}`
  console.log(setFilePath)

  // Inserts the ID, fileName, date of creation and file path to the database
  db.query('INSERT INTO FILE (USER_ID, FILE_NAME, FILE_CREATION, FILE_PATH) VALUES (?, ?, ?, ?)', 
  [setUserID, setFileName, setFileCreation, setFilePath], (err, result) => {
    if(err){
      res.status(417).send('Error! File could not be uploded to the database')
      console.error(err)
    }
    else{
      res.status(200).send('File called ' + setFileName + ' sucessfully added to the database')
      console.log(result)
    }
  })
})

app.post("/delete-file", (req, res) => {
  const fileToDelete = req.body.fileID

  // Grabs the file based on the provided ID
    db.query('SELECT * FROM FILE WHERE FILE_ID = ?;', [fileToDelete], (err, result) => {
      if(err){
        res.status(417).send('Error! The server could not complete delete-files request')
        console.error(err)
      } else {
        // Gets the path, then deletes the target file
        const pathToDelete = result[0].FILE_PATH
        fs.unlinkSync(`${__dirname}/seeker/files/${pathToDelete}`)

        //Delets the entry from the database
        db.query('DELETE FROM FILE WHERE FILE_ID = ?;', [fileToDelete], (err) => {
          if(err){
            res.status(417).send('Error! The server could not complete delete-files request')
            console.error(err)
          } else {
            res.status(200).send('File successfully deleted from the database!')
          }
      })
    }
  })
})

// Starts the listener so we can communicate with the other services
app.listen('3001', () => { })