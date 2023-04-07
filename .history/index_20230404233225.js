const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');

const { Client } = require('pg')
const client = new Client({
  user: 'aramys21',
  host: 'dpg-cgllmnu4dade7ecr7uh0-a.frankfurt-postgres.render.com',
  database: 'alibaydb',
  password: 'zoUaEbh1Ynmn7gEFZJCNfrCXOirEVAo7',
  port: 5432,
  ssl: true,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static(path.join(__dirname, 'public')));
// Serve index.html as the homepage
app.get('/', async (req, res) => {
  try {
    res.sendFile(__dirname + '/home.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


// Fetch all rows from the 'users' table
pool.connect((err, client, done) => {
  if (err) throw err;
  client.query('SELECT * FROM users', (err, result) => {
    done(); // release the client back to the pool
    if (err) throw err;
    console.log(result.rows); // prints the rows of the 'users' table
    pool.end(); // close the connection pool
  });
});

app.listen(3060, () => {
  console.log('Server started on port 3060');
});
