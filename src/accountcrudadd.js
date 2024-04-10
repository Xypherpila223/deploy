const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 8050;

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

app.get('/accountcrudadd', (req, res) => {
    res.sendFile(__dirname + '/accountcrudadd.html');
  });


app.post('/accountcrudadd', (req, res) => {
  const { id, username, password } = req.body;
  connection.query(
    'INSERT INTO studentaccount (ID, username, password) VALUES (?, ?, ?)',
    [id, username, password],
    (err, results) => {
      if (err) {
        console.error('Error inserting student data: ' + err.stack);
        res.status(500).json({ error: 'Error inserting student data' });
        return;
      }

      res.redirect('/accountcrudadd.html');
    }
  );
});

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
