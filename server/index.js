const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Handles our mySQL server connection
const db = mysql.createPool({
  host: 'mysql_db', 
  user: 'MYSQL_USER', 
  password: 'MYSQL_PASSWORD', 
  database: 'books'
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

// Grabs the table from our DB
app.get('/get', (req, res) => {
  const SelectQuery = " SELECT * FROM  books_reviews";
  db.query(SelectQuery, (err, result) => {
    res.send(result)
  })
})

// Handles adding a element to the DB
app.post("/insert", (req, res) => {
  const bookName = req.body.setBookName;
  const bookReview = req.body.setReview;
  const InsertQuery = "INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";
  db.query(InsertQuery, [bookName, bookReview], (err, result) => {
    console.log(result)
  })
})

// Handles deleting an element from the DB
app.delete("/delete/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";
  db.query(DeleteQuery, bookId, (err, result) => {
    if (err) console.log(err);
  })
})

// Handles updating an element from the DB
app.put("/update/:bookId", (req, res) => {
  const bookReview = req.body.reviewUpdate;
  const bookId = req.params.bookId;
  const UpdateQuery = "UPDATE books_reviews SET book_review = ? WHERE id = ?";
  db.query(UpdateQuery, [bookReview, bookId], (err, result) => {
    if (err) console.log(err)
  })
})

// Starts the listener so we can communicate with the other services
app.listen('3001', () => { })
