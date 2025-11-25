require('dotenv').config();
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
global.db = db;

const mainRouter = require('./routes/main');
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');

app.use('/', mainRouter);
app.use('/books', booksRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

