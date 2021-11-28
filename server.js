// to start SQL run mysql -u root -p
// to create data base in CL CREATE DATABASE name;
// once created we must use is with USE databaseName;
// Next, create tables in see 12.1.4
// Then populate data into the table. See 12.1.5

// Import express
const express = require("express");

// Port designation
const PORT = process.env.PORT || 3001;
const app = express();

// middleware - See 12.2.3
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
