const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getQuery(query, params) {
  try {
    const [rows] = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

module.exports = getQuery;
