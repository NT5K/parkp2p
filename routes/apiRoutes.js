
const connection = require("./connection");
const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator');

module.exports = router;

//===========================================================================

router.get('/api/customers', (req, res) => {
  const query = "Select * FROM users;";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Failed to get users')
    } else {
      // console.log(result)
      return res.json(result);
    };
  });
  
});

//===========================================================================
  // THIS SHOULD NOT BE ABLE TO PULL PERSONAL INFORMATION
  // ALSO CHECK IF ACTIVE STATE IS TRUE OR FALSE
//=======================================querying the dummy data in sql=======
router.get('/api/public/driveways', (req, res) => {
  const query = "SELECT * FROM users;";

  connection.query(query, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("Failed to retrieve Data")
    } else {
      return res.json(result);
    };
  });
});

//============================================================================
