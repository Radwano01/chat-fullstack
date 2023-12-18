const mysql = require("mysql")

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectTimeout:process.env.CONNECT_TIMEOUT,
    port: process.env.PORT,
    ssl: {
      rejectUnauthorized: true,
    },
  });

module.exports = {
    db
}