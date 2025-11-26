const express = require('express');
const router = express.Router();

// Middleware from users.js
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/users/login');
    } else {
        next();
    }
};

// Home page
router.get('/', (req, res) => {
  res.render('index');
});

// Logout route (Week 8)
router.get('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.send("You are now logged out. <a href='/'>Home</a>");
    });
});

module.exports = router;


