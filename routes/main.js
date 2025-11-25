const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('index');   // renders views/index.ejs
});

// Export router so index.js can use it
module.exports = router;
