const express = require("express");
const router = express.Router();

// ==========================
// Dynamic shop data
// ==========================
const shopData = {
  shopName: "The Thirsty Student",
  productCategories: ["Beer", "Wine", "Soft Drinks", "Hot Drinks"],
  shops: [
    { name: "Central Shop", manager: "Alice Smith", address: "123 Main St" },
    { name: "North Shop", manager: "Bob Jones", address: "456 North Rd" },
    { name: "East Shop", manager: "Carol Lee", address: "789 East Ave" }
  ]
};

// ==========================
// Contact messages
// ==========================
const contactMessages = [];

// ==========================
// Home route
// ==========================
router.get("/", (req, res) => {
  res.render("index.ejs", shopData);
});

// ==========================
// About route
// ==========================
router.get("/about", (req, res) => {
  res.render("about.ejs", shopData);
});

// ==========================
// Search route
// ==========================
router.get("/search", (req, res) => {
  res.render("search.ejs", shopData);
});

// Search result
router.get("/search_result", (req, res) => {
  const searchText = req.query.search_text;
  const category = req.query.category;

  const results = shopData.productCategories.filter(product =>
    product.toLowerCase().includes(searchText.toLowerCase())
  );

  res.render("search.ejs", {
    ...shopData,
    searchTerm: searchText,
    category: category,
    results: results
  });
});

// ==========================
// Contact routes
// ==========================
router.get("/contact", (req, res) => {
  res.render("contact.ejs", shopData);
});

router.post("/contact", (req, res) => {
  const { name, message } = req.body;
  contactMessages.push({ name, message, date: new Date() });

  res.send(`
    <h1>Thanks, ${name}!</h1>
    <p>Your message has been received.</p>
    <p><a href="/contact/messages">View all messages</a></p>
    <p><a href="/">Return Home</a></p>
  `);
});

router.get("/contact/messages", (req, res) => {
  let messageList = contactMessages.map(m => {
    return `<li><strong>${m.name}</strong> (${m.date.toLocaleString()}): ${m.message}</li>`;
  }).join("");

  if (!messageList) messageList = "<p>No messages yet.</p>";

  res.send(`
    <h1>All Contact Messages</h1>
    <ul>${messageList}</ul>
    <p><a href="/contact">Back to Contact Page</a></p>
    <p><a href="/">Return Home</a></p>
  `);
});

// ==========================
// Register routes
// ==========================
router.get("/register", (req, res) => {
  res.render("register.ejs", shopData);
});

router.post("/registered", (req, res) => {
  const { first, last, email } = req.body;
  res.send(`Hello ${first} ${last}, you are now registered! Your email: ${email}`);
});

// ==========================
// Survey routes
// ==========================
router.get("/survey", (req, res) => {
  res.render("survey.ejs", shopData);
});

router.post("/survey_result", (req, res) => {
  const { first, last, email, age, drink, student } = req.body;
  res.send(`
    <h1>Survey Responses</h1>
    <p><strong>Name:</strong> ${first} ${last}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Age:</strong> ${age}</p>
    <p><strong>Drink Category:</strong> ${drink}</p>
    <p><strong>Student:</strong> ${student ? "Yes" : "No"}</p>
    <p><a href="/">Return Home</a></p>
  `);
});

module.exports = router;
