const mysql = require('mysql2');


// const {host, user, password, database} = process.env

const db = mysql.createConnection({
  host     : 'localhost',
  user     = 'root'
  password = ''
  database = 'tickitz'
});

db.connect ((err) => {
  if(err) {
    console.log(err)
  }
  console.log('DB CONNECTED')
})


module.exports = db
