const express = require('express');
const app = express();
const port = 8000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
const mainRoutes = require('./routes/main');
const booksRoutes = require('./routes/books');

app.use('/', mainRoutes);
app.use('/books', booksRoutes);

// Start server
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});




