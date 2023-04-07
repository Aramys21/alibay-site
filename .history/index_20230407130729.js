const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const ejs = require('ejs');

// set up session middleware

// Configure body-parser middleware to parse JSON data
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

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

// Serve static files from the public directory
app.use(express.static('public'));

app.use(session({ resave: true, secret: "123456", saveUninitialized: true }));

// use a middleware function
app.use((req, res, next) => {
    // init variables you want to set in req.session
    res.locals.username = "anonyme";
    res.locals.loggedin = false;
  next();
});
// Serve index.html as the homepage
app.get('/', async (req, res) => {
  try {
    console.log(req.session.username);
    res.render('home.ejs', {username : req.session.username,loggedIn : req.session.loggedin});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.get('/vetements', async (req, res) => {
  try {
    res.render('vetements.ejs', {username : req.session.username});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.get('/product-page', async (req, res) => {
  try {
    res.render('product-page.ejs', {username : req.session.username});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
app.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    res.locals.user = null;
    res.redirect('/');
  });
});
app.get('/loginPage', async (req, res) => {
  try {
    res.render('login.ejs', {username : req.session.username});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(password)

  client.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching user from database');
      return;
    }

    if (result.rows.length === 0) {
      res.status(401).send('Unknown user');
      return;
    }

    const user = result.rows[0];

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error comparing passwords');
        return;
      }

      if (result) {
        req.session.username = user.username;
        req.session.loggedin = true;
        res.redirect('/');
      } else {
        res.status(401).send('Incorrect password');
      }
    });
  });
});
// register route


app.get('/registerPage', async (req, res) => {
  try {
    res.render('register.ejs', {username : req.session.username});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
app.post('/register', async (req, res) => {
  console.log(req.body.username);
  const { username, email, password, confirmPassword } = req.body;

  // check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    // check if user already exists
    const result = await client.query('SELECT * FROM users WHERE username=$1', [username]);
    if (result.rows.length > 0) {
      return res.status(409).send('Username already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // insert user into database
    await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, passwordHash]);

    res.redirect('/');
    res.write('<script>window.alert("Success.");</script>');
  } catch (err) {
    console.error(err);
    res.redirect('/');
    res.write('<script>window.alert("Failed to register.");</script>');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
