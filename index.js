const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 8000;

// Middleware to parse POST form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images)
app.use(express.static('public'));

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Load routes
const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

// Start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
