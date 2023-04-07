const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');

const { Client } = require('pg')
const client = new Client("PGPASSWORD=zoUaEbh1Ynmn7gEFZJCNfrCXOirEVAo7 psql -h dpg-cgllmnu4dade7ecr7uh0-a.frankfurt-postgres.render.com -U aramys21 alibaydb")
  /*{
  user: 'aramys21',
  host: 'dpg-cgllmnu4dade7ecr7uh0-a.frankfurt-postgres.render.com',
  database: 'alibaydb',
  password: 'zoUaEbh1Ynmn7gEFZJCNfrCXOirEVAo7',
  port: 5432,
  ssl: true,
})*/
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
