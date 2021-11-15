const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')


const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

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
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

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

app.get("/login", (req, res) => {
  if(req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

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

// Starts the listener so we can communicate with the other services
app.listen('3001', () => { })