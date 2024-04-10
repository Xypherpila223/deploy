const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 8040;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  port: 3306,
  database: 'sccinventory'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as ID ' + connection.threadId);
});

const desktopPath = path.join(__dirname, '..', 'src');
app.use(express.static(desktopPath));



app.get('/accountcrud', (req, res) => {
  connection.query('SELECT ID, username, password FROM studentaccount', (err, results) => {
    if (err) {
      console.error('Error querying studentaccount table: ' + err.stack);
      res.status(500).json({ error: 'Error querying studentaccount table' });
      return;
    }

    res.json(results);
  });
});


app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
