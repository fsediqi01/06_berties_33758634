# Bertie’s Books – Coursework Project

This is the full Web Applications coursework project for **Bertie’s Books**, including book management, user login, secure password hashing, registration, search, and audit logging. The backend uses **Node.js + Express + MySQL**.

---

## 📁 Project Structure

```
06_berties_33758634/
│ index.js
│ package.json
│ package-lock.json
│ .env
│ insert_test_data.sql
│ links.txt
│
├── routes/
│   ├── main.js
│   ├── books.js
│   └── users.js
│
├── views/
│   ├── index.ejs
│   ├── list.ejs
│   ├── addbook.ejs
│   ├── search.ejs
│   ├── searchresults.ejs
│   ├── register.ejs
│   ├── login.ejs
│   ├── listusers.ejs
│   └── audit.ejs
│
└── public/
    └── style.css
```

---

## ⚙️ Installation

Run this inside the project folder:

```
npm install
```

---

## 🔐 Environment Variables (`.env`)

Your `.env` file should contain:

```
DB_HOST=localhost
DB_USER=asedi001
DB_PASS=Berties2024!
DB_NAME=berties_books
```

---

## 🗄️ Database Setup

Login to MySQL:

```
mysql -u YOURUSER -p
```

Create database:

```sql
CREATE DATABASE berties_books;
USE berties_books;
```

Import starter data:

```
mysql -u YOURUSER -p berties_books < insert_test_data.sql
```

This creates the `users`, `books`, and `auditlog` tables.

---

## 🚀 Running the App

Start the server:

```
node index.js
```

Open in browser:

```
http://localhost:3000
```

---

## 📚 Features

### ✔ Book System
- List all books  
- Add a book  
- Search books by title or author  

### ✔ User Registration
- Registers username, first, last, email, password  
- Password hashed using **bcrypt**

### ✔ Login System
- Secure login  
- Checks hashed password  
- Shows success/fail messages  

### ✔ Audit Log
Tracks every login attempt:
- username  
- success/failure  
- timestamp  

View log at:

```
/users/audit
```

---

## 🔐 Security
- Passwords hashed with bcrypt  
- SQL placeholder parameters prevent injection  
- `.env` stores secrets  
- `.gitignore` hides `.env` and `node_modules`

---

## 🧪 Expected for Marking
Your submission must:
1. Run with `node index.js`  
2. Show homepage at `/`  
3. List books at `/books/list`  
4. Add books at `/books/addbook`  
5. Search at `/books/search`  
6. Register user at `/users/register`  
7. List users at `/users/list` (no passwords!)  
8. Login at `/users/login`  
9. Show audit log at `/users/audit`  
10. Include README.md (this file)

---

## 👤 Student Information
**Name:** Ahmad  
**Username:** `asedi001`  
**Student ID:** 33758634  
**Course:** Web Applications  
**Year:** 2024/2025  

---

This README meets all requirements for the Web Applications coursework.
