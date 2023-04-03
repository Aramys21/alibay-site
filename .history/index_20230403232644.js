const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');

app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html as the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.listen(3060, () => {
  console.log('Server started on port 3060');
});
