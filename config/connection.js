const mysql = require('mysql2');

// SQL CONNECTION: Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'V&LVt*Qjp5d]7yp',
    database: 'employeedb'
  },
  console.log('Connected to the employee database.')
);

module.exports = db;