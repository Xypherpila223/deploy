const mysql = require('mysql');

// Database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  port: 3306,
  database: 'sccinventory' // Replace 'your_database_name' with your actual database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as ID ' + connection.threadId);
});

module.exports = connection;
