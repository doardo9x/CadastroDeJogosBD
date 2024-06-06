const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'liduca2'
});

module.exports = pool.promise();