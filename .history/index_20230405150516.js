const express = require('express');
const path = require('path');
const app = express();

const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

// set up session middleware
app.use(session({
  secret: 'mySecretKey', // change this to a secret key of your choice
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set to true if using HTTPS
}));
// Configure body-parser middleware to parse JSON data
app.use(express.json());

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

// login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  pool.query('SELECT * FROM users WHERE username = $1', [username], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database error');
    } else if (results.rows.length > 0) {
      const user = results.rows[0];

      // compare password hash to input password
      bcrypt.compare(password, user.password_hash, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error comparing passwords');
        } else if (result) {
          // set session user ID to authenticated user ID
          req.session.userId = user.id;
          res.send('Login successful');
        } else {
          res.status(401).send('Incorrect password');
        }
      });
    } else {
      res.status(401).send('Unknown user');
    }
  });
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
    //client.end(); // close the client connection
    //console.log('L bozo');
  });


  // Route handler for POST request to /register
app.post('/register', (req, res) => {
  // Access the request body data

  // Insert the user data into the users table in the database
  const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
  const values = [req.body.username, req.body.email, req.body.password];
  console.log("bruh");
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

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
