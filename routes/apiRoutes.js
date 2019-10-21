const connection = require("./connection");
const express = require('express');
const router = express.Router();

module.exports = router;

//===========================================================================
// THIS SHOULD NOT BE ABLE TO PULL PERSONAL INFORMATION
// ALSO CHECK IF ACTIVE STATE IS TRUE OR FALSE
//=======================================querying the dummy data in sql=======
router.get('/api/public/driveways', (req, res) => {
  const query = "SELECT * FROM users;";

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Failed to retrieve Data")
    } else {
      return res.json(result);
    };
  });
});


//===========================================================================
// get email for nav
//============================================================================
router.get('/api/account/personal/email/:token', (req, res) => {
  const query = "Select Email FROM users WHERE ID = ?;";
  const { token } = req.params
  const input = [token]
  connection.query(query, input, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Failed to get email')
    } else {
      // console.log(result)
      return res.json(result);
    };
  });
})


//===========================================================================
// get all from user based on token
//============================================================================
router.get('/api/account/personal/:token', (req, res) => {
  const query = "Select * FROM users WHERE ID = ?;";
  const { token } = req.params
  const input = [token]
  connection.query(query, input, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Failed to get user')
    } else {
      // console.log(result)
      return res.json(result);
    };
  });
});

//============================================================================
