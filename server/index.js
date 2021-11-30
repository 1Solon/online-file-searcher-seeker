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
)
// Middleware
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('seeker/files'))
app.use(fileUpload())
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
)

/*
 Handles /session logic: Session stores the users id, name, email and other various useful pieces of information. Session took us almost a week to get our heads around. In the end
 we are happy we went with using them. Later on in the project, /session proved to be an invaluable way to pass information too and from functions and maintain data integrity in 
 secure way 
*/
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
    // Inserting user with hashed password into the database -> This will also make sure that that the user does not use a usename that already exist (the database wont let the username to be repeated)
    db.query("INSERT INTO USERS (USER_NAME, USER_EMAIL, USER_PASSWORD) VALUES (?, ?, ?)", [setUserName, setEmail, hash], (err, result) => {
      if(err){
        res.send({ userCreated: false })
      }
      else{
        res.send({ userCreated: true })
      }
    })
  })
})

// Handles validating the user -> The username exist, and the password, and username match
app.post("/login", (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const isLogged = false
  
  // Checking the user exist -> Otherwise it will send an error
  db.query('SELECT * FROM USERS WHERE USER_NAME = ?;', [username], (err, result) => {
    console.log(result)
    if (err) {
      res.send({ err: err })
    }
    if(result.length > 0) {
      // Compare password in the datbase with the one enterend by the user
      bcrypt.compare(password, result[0].USER_PASSWORD, (error, response) => {
        if(response){
            req.session.user = result
            res.send(result)
        }
        else{
          res.send(isLogged)
        }
      })
    }
    else{
      // res.send({message: "User does not exist"})
      res.send(isLogged)
    }
  })
})

// Handles user update (change username or password)
app.post('/update-details', (req, res) => {
  const userId = req.body.userId
  let newUsername = req.body.updateUsername
  let newPassword = req.body.updatePassword
  let userUpdated = false
  let passCheck = false

  // If the user didn't change the username -> Use the one in the database
  if(newUsername === ''){
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

  // If user didn't change the password -> Use the one in the database
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

  // If did not enter a new password -> Enter/update the database with the preveious hashed password
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
  // In the otherhand if the user did enter a new password -> Encrypt the new password entered by the user
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

/*
 Handles file upload logic: As mentioned below, we decided to store files in a local folder (we called in localStore) with a path refrence inside the database. As you can see, 
 when we recieve the file we add a random number value to the beginning, this was done to allow the user to insert many of the same file into the program at once
 (this was also done to save us time), if nothing else we're particularly proud of the effort put into our localStore
*/
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

/* 
Handles delete-file logic: This particualr file caused us a lot of difficulty, early on we dediced to store our files locally in seeker/files, with a path to said file present on the
database. In hindsight, this was overly complicated, but this idea proved to teach us a lot about how node.js handles file systems, in addition to the various trials and tribulations
present with synchronous and asynchronous files 
*/
app.post("/delete-file", (req, res) => {
  const fileToDelete = req.body.fileID

  // Grabs the file based on the provided ID
    db.query('SELECT * FROM FILE WHERE FILE_ID = ?;', [fileToDelete], (err, result) => {
      if(err){
        res.status(417).send('Error! The server could not complete delete-files request')
        console.error(err)
      } else {
        // Gets the path, then deletes the target file
        
        try {
          const pathToDelete = result[0].FILE_PATH
          fs.unlinkSync(`${__dirname}/seeker/files/${pathToDelete}`, (err) => {})
        } catch (error) {
          console.error("File failed to delete")
        }

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

// Handles delete user logic
app.post("/delete-user", (req, res) => {
  const userID = req.body.userid

  // Deletes user from the database
  db.query("DELETE FROM USERS WHERE USER_ID = ?", [userID], (err, res) => {
    if (err){
      console.log(err)
    }
    else{
      console.log("Sucessfully deleted")
    }
  })
  res.status(200).send('User Deleted Sucessfully')
})

// Starts the listener so we can communicate with the other services
app.listen('3001', () => { })