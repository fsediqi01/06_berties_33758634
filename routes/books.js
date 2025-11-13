const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// ==========================
// Database connection
// ==========================
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // your MySQL username
  password: 'Ershad@38', // your actual MySQL password
  database: 'berties_books'
});


// Test connection
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL (berties_books)');
  }
});

// ==========================
// List all books
// ==========================
router.get('/list', (req, res, next) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return next(err);
    res.render('list', { availableBooks: results });
  });
});

// ==========================
// Add a new book form
// ==========================
router.get('/addbook', (req, res) => {
  res.render('addbook');
});

// ==========================
// Save new book to DB
// ==========================
router.post('/bookadded', (req, res, next) => {
  const { name, price } = req.body;
  db.query('INSERT INTO books (name, price) VALUES (?, ?)', [name, price], (err, result) => {
    if (err) return next(err);
    res.send(`
      <h2>✅ Book added successfully!</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Price:</strong> £${parseFloat(price).toFixed(2)}</p>
      <p><a href="/books/list">View all books</a></p>
      <p><a href="/">Return Home</a></p>
    `);
  });
});

// ==========================
// Bargain books (< £20)
// ==========================
router.get('/bargainbooks', (req, res, next) => {
  db.query('SELECT * FROM books WHERE price < 20', (err, results) => {
    if (err) return next(err);
    res.render('bargainbooks', { bargainBooks: results });
  });
});

// ==========================
// Search books
// ==========================
router.get('/search', (req, res, next) => {
  const keyword = req.query.keyword;
  if (!keyword) return res.send('<h3>Please enter a search term.</h3><a href="/">Go back</a>');

  db.query('SELECT * FROM books WHERE name LIKE ?', [`%${keyword}%`], (err, results) => {
    if (err) return next(err);
    res.render('searchresults', { keyword, searchResults: results });
  });
});

module.exports = router;



