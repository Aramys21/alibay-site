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

  client.query('SELECT * FROM users WHERE username = $1', [username], (err, results) => {
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
// register route
app.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // check if passwords match
  if (password !== confirmPassword) {
    res.status(400).send('Passwords do not match');
    return;
  }

  // check if user already exists
  pool.query('SELECT * FROM users WHERE username = $1', [username], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database error');
      return;
    }

    if (results.rows.length > 0) {
      res.status(400).send('Username already taken');
      return;
    }

    // hash password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error hashing password');
        return;
      }

      // insert user into database
      pool.query('INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)', [username, email, hash], (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Database error');
          return;
        }

        alert('Registration successful');
      });
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
