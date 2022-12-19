const mysql = require("mysql");

require("dotenv").config();

const database = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

database.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("Connection Failed", err);
  }
});

module.exports = database;
