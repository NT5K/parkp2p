
const connection = require("./connection");
const express = require('express');
const router = express.Router();

module.exports = router;

//===========================================================================

router.get('/api/customers', (req, res) => {
  const query = "Select * FROM driveways;";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Failed to get driveways')
    } else {
      console.log(result)
      return res.json(result);
    };
  });
  
});

//===========================================================================

router.post('/register_user', (req, res) => {
  const query = "INSERT INTO driveways(Email, Pass, Username) VALUES(?, ?, ?);";
  const body = [req.body.inputEmail, req.body.inputPassword, req.body.inputUsername];
 
  connection.query(query, body, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Failed to register user')
    } else {
      console.log(result)
      return res.json(result);
    };
  });

});