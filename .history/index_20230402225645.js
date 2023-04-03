const express = require('express');
const path = require('path');
const app = express();

const mysql = require('mysql');

app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html as the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'my_database'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database!');

  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  const values = ['John Doe', 'johndoe@example.com'];

  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log('1 row inserted!');
  });
});


app.listen(3060, () => {
  console.log('Server started on port 3060');
});
