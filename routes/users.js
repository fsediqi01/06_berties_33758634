var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// ===============================
// 🔐 Week 8: Login Protection
// ===============================
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/users/login');
    }
    next();
};

// ===============================
// Registration form
// ===============================
router.get('/register', function(req, res) {
    res.render('register');
});

// ===============================
// Handle registration
// ===============================
router.post('/registered', function(req, res) {
    const plainPassword = req.body.password;

    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        if (err) throw err;

        let sql = `
            INSERT INTO users (username, first, last, email, hashedPassword)
            VALUES (?, ?, ?, ?, ?)
        `;

        let params = [
            req.body.username,
            req.body.first,
            req.body.last,
            req.body.email,
            hashedPassword
        ];

        db.query(sql, params, (err, result) => {
            if (err) throw err;

            let output = '';
            output += `Hello ${req.body.first} ${req.body.last}, you are now registered!<br>`;
            output += `We will send an email to ${req.body.email}<br><br>`;
            output += `Your password is: ${req.body.password}<br>`;
            output += `Your hashed password is: ${hashedPassword}`;

            res.send(output);
        });
    });
});

// ===============================
// List Users — 🔐 Protected
// ===============================
router.get('/list', redirectLogin, function(req, res) {

    let sql = `SELECT username, first, last, email FROM users`;

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('listusers', { users: results });
    });

});

// ===============================
// Login form
// ===============================
router.get('/login', function(req, res) {
    res.render('login');
});

// ===============================
// Handle login
// ===============================
router.post('/loggedin', function(req, res) {

    let username = req.body.username;
    let password = req.body.password;

    let sql = `SELECT * FROM users WHERE username = ?`;

    db.query(sql, [username], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            logAudit(username, false);
            return res.send("Login failed: Username not found");
        }

        let hashedPassword = results[0].hashedPassword;

        bcrypt.compare(password, hashedPassword, function(err, match) {
            if (err) throw err;

            if (match) {
                // 🔐 Week 8: Save session
                req.session.userId = username;

                logAudit(username, true);
                res.send("Login successful!");
            } else {
                logAudit(username, false);
                res.send("Login failed: Incorrect password");
            }
        });
    });
});

// ===============================
// Audit log function
// ===============================
function logAudit(username, success) {
    let sql = `
        INSERT INTO auditlog (username, success)
        VALUES (?, ?)
    `;
    db.query(sql, [username, success], (err, result) => {
        if (err) throw err;
    });
}

// ===============================
// Audit Page — 🔐 Protected
// ===============================
router.get('/audit', redirectLogin, function(req, res) {

    let sql = `SELECT * FROM auditlog ORDER BY timestamp DESC`;

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('audit', { logs: results });
    });

});

module.exports = router;

