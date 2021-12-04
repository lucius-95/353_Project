const express = require("express");
const router = express.Router();
const mysql = require("mysql");


const MYSQL_HOST = process.env.MYSQL_HOST || "localhost"
const MYSQL_PORT = process.env.MYSQL_PORT || 3307
console.log(`mysql host is : ${MYSQL_HOST}`)
router.get("/team", (req, res) => {
  let con = mysql.createConnection({
    host: MYSQL_HOST,
    user: "root",
    port: MYSQL_PORT,
    database: "team",
    password: "project",
  });
  // Connect to database
  con.connect((err) => {
    if (err)
    { console.log("cannot connect to MySQL")
      return;
    }
    console.log("MySQL Database Connected!");
  });
  
  let sql = "SELECT * FROM members ORDER BY id";
  con.query(sql, (err, data) => {
    if (err) throw err;
    res.json(data);
  });

  con.end();
});

module.exports = router;
