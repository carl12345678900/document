const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.DB_PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,

  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = db;
