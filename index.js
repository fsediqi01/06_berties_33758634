require('dotenv').config();
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session');  // <-- WEEK 8 ADDITION

const app = express();
const port = 8000;

// =========================
// Static + Body Parser
// =========================
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// =========================
// View Engine
// =========================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// =========================
// Session Setup (WEEK 8)
// =========================
app.use(
    session({
        secret: 'somerandomstuff',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000, // 10 minutes
        },
    })
);

// =========================
// DATABASE CONNECTION
// =========================
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
global.db = db;

// =========================
// ROUTERS
// =========================
const mainRouter = require('./routes/main');
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');

app.use('/', mainRouter);
app.use('/books', booksRouter);
app.use('/users', usersRouter);

// =========================
// START SERVER
// =========================
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


