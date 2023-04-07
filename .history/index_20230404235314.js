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
client.query('SELECT * FROM users')
  .then((result) => {
    console.log(result.rows); // prints the rows of the 'users' table
  })
  .catch((err) => {
    console.error('Error:', err);
  })
  .finally(() => {
    client.end(); // close the client connection
  });


  // Route handler for POST request to /register
app.post('/register', (req, res) => {
  // Access the request body data

  // Insert the user data into the users table in the database
  const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
  const values = [res.b];

  // Execute the database query
  client.query(query, values)
    .then(result => {
      // Send a response to the client with the inserted user data
      const newUser = result.rows[0];
      res.json({ message: 'User registered successfully.', user: newUser });
    })
    .catch(err => {
      console.error('Error inserting user into database', err);
      res.status(500).json({ error: 'Failed to register user.' });
    });
});

app.listen(3060, () => {
  console.log('Server started on port 3060');
});
