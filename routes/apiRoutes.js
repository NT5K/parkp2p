
const connection = require("./connection");
const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator');

module.exports = router;

//===========================================================================

router.get('/api/customers', (req, res) => {
  const query = "Select * FROM driveways;";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Failed to get driveways')
    } else {
      // console.log(result)
      return res.json(result);
    };
  });
  
});

//===========================================================================

router.post('/api/account/')