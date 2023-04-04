const express = require('express');
const { Pool } = require('pg');

// Replace with your own database connection string
const connectionString = 'postgres://username:password@host:port/database';

const pool = new Pool({
  connectionString,
});

const app = express();

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

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
