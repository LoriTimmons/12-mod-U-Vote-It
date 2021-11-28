// to start SQL run mysql -u root -p
// to create data base in CL CREATE DATABASE name;
// once created we must use is with USE databaseName;
// Next, create tables in see 12.1.4
// Then populate data into the table. See 12.1.5

// Import express / mysql2
const express = require("express");
const mysql = require("mysql2");

// Port designation
const PORT = process.env.PORT || 3001;
const app = express();

// middleware - See 12.2.3
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middleware - Connect to database / mysql
const db = mysql.createConnection(
  {
    host: "localhost",
    // username
    user: "root",
    // my SQL P/W
    password: "Ml512303",
    database: "election",
  },
  console.log("connected to the election database")
);

// query of the database to test connection - basically a getAll
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log('this is the log' ,rows);
// });

// Get one 
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});

// delete 
db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// create 
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});



// test route / example route - No longer needed.
// app.get('/', (req, res) => {
//     res.json({
//       message: 'Hello World'
//     });
//     // Default response for any other request (Not Found)
//     app.use((req, res) => {
//       res.status(404).end()
//     });
//   });

// function that will start the Express.js server on port 3001.
// Keep at bottom
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// 12.2.2
