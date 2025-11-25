
const express = require('express');
const router = express.Router();

const db = global.db;

router.get('/list', (req, res, next) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) return next(err);
        res.render('list', { availableBooks: results });
    });
});

router.get('/addbook', (req, res) => {
    res.render('addbook');
});

router.post('/addbook', (req, res, next) => {
    const { title, author, price } = req.body;
    const sql = "INSERT INTO books (title, author, price) VALUES (?, ?, ?)";
    db.query(sql, [title, author, price], (err) => {
        if (err) return next(err);
        res.redirect('/books/list');
    });
});

router.get('/search', (req, res) => {
    res.render('search');
});

router.post('/search', (req, res, next) => {
    const searchTerm = `%${req.body.keyword}%`;
    const sql = "SELECT * FROM books WHERE title LIKE ? OR author LIKE ?";
    db.query(sql, [searchTerm, searchTerm], (err, results) => {
        if (err) return next(err);
        res.render('searchresults', { results });
    });
});

module.exports = router;
