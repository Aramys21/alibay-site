const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');

const { Client } = require('pg')
const client = new Client({
  user: 'aramys21',
  host: 'PGPASSWORD=zoUaEbdpg-cgllmnu4dade7ecr7uh0-a.frankfurt-postgres.render.com',
  database: 'postgres',
  password: 'password',
  port: 5432,
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

app.listen(3060, () => {
  console.log('Server started on port 3060');
});
