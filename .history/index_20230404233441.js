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


// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to the database');
    // Fetch all rows from the 'users' table
    return client.query('SELECT * FROM users');
  })
  .then((result) => {
    console.log(result.rows); // prints the rows of the 'users' table
  })
  .catch((err) => {
    console.error('Error:', err);
  })
  .finally(() => {
    client.end(); // close the client connection
  });
Just like in the previous example, you need to replace the placeholders (your_username, your_password, your_host, your_database, and your_port) with the appropriate values for your PostgreSQL database configuration. The Client class is used to create a client instance, connect to the database, and execute a query to fetch all rows from the users table. The fetched rows are then printed to the console. Finally, the client connection is closed using





app.listen(3060, () => {
  console.log('Server started on port 3060');
});
