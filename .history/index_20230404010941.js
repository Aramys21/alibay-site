const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');

const { Pool } = require('pg');

// Replace with your own database connection string
const connectionString = 'postgres://username:password@host:port/database';

const pool = new Pool({
  connectionString,
});

app.use(express.static(path.join(__dirname, 'public')));
// Serve index.html as the homepage
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    const users = result.rows;
    res.sendFile(__dirname + '/home.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.listen(3060, () => {
  console.log('Server started on port 3060');
});
