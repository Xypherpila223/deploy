const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/registration', (req, res) => {
  res.sendFile(__dirname + '/registration.html');
});

app.post('/registration', (req, res) => {
  const { schoolId, email, lastname, course, firstname, section, middleInitial, year, age, contact, username, password } = req.body;

  connection.beginTransaction((err) => {
    if (err) {
      console.error('Error beginning transaction: ' + err.stack);
      return;
    }

    connection.query('INSERT INTO studentprofile (school_id, email, last_name, course, first_name, section, middle_initial, year_level, age, contact) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [schoolId, email, lastname, course, firstname, section, middleInitial, year, age, contact], (err, result) => {
        if (err) {
          return connection.rollback(() => {
            console.error('Error inserting into studentprofile table: ' + err.stack);
            res.status(500).send('Error inserting into studentprofile table');
          });
        }

        const studentProfileId = result.insertId;

        connection.query('INSERT INTO studentaccount (ID,username,password) VALUES (?, ?, ?)',
          [studentProfileId,username,password], (err) => {
            if (err) {
              return connection.rollback(() => {
                console.error('Error inserting into studentaccount table: ' + err.stack);
                res.status(500).send('Error inserting into studentaccount table');
              });
            }

            connection.commit((err) => {
              if (err) {
                return connection.rollback(() => {
                  console.error('Error committing transaction: ' + err.stack);
                  res.status(500).send('Error committing transaction');
                });
              }

              console.log('Transaction complete.');
              res.send('Registration successful!');
            });
          });
      });
  });
});

app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
