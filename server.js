// to start SQL run mysql -u root -p
// to create data base in CL CREATE DATABASE name;
// once created we must use is with USE databaseName;
// Next, create tables in see 12.1.4
// Then populate data into the table. See 12.1.5

// Import express / mysql2
const express = require("express");
const mysql = require("mysql2");

// import inputCheck
const inputCheck = require('./utils/inputCheck');

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
app.get('/api/candidates', (req, res) => {
  const sql = 'SELECT * FROm candidates';
db.query(sql, (err, rows) => {
  if(err) {
    res.status(500).json({ Error: err.message});
    return;
  }
  res.json({
    message: 'success',
    data: rows
    });
  });
});

// Get a single candidate
app.get('/api/candidate/:id', (req, res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Delete a candidate
// http method delete() used
// req.params.id gets specific id
app.delete('/api/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
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

// Create a candidate
// { body } is destructure to cal req.body
// inputCheck is validating the entry params 
// Must import inputCheck
app.post('/api/candidate', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
const params = [body.first_name, body.last_name, body.industry_connected];

db.query(sql, params, (err, result) => {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: body
  });
});
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
