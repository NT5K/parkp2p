
const connection = require("./connection");
const express = require('express');
const router = express.Router();

module.exports = router;

//===========================================================================
// select all products from table

// router.get('/api/customers', (req, res) => {
//     const query = "Select * FROM driveways;";
//     // query the products database for all products
//     connection.query(query, (err, result) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).send('nekorb')
//         } else {
//             // display json so can grab data using ajax
//             console.log(result)
//             return res.json(result);
//         };
//     });
// });