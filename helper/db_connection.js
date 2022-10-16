const mysql = require('mysql2');


const {host, user, password, database} = process.env

const db = mysql.createPool({
  host     : host,
  user     : user,
  password : password,
  database : database
});

module.exports = db
