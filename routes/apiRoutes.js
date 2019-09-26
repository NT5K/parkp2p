
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

router.post('/user/register', (req, res) => {
  const query = "INSERT INTO driveways(Email, Pass, Username) VALUES(?, ?, ?);";
  const body = [req.body.inputEmail, req.body.inputPassword, req.body.inputUsername];
  // console.log(body)
  const {inputEmail, inputUsername, inputPassword, passwordMatch} = req.body
  req.checkBody('inputEmail', 'email field can not be empty').notEmpty();
  req.checkBody('inputUsername', 'username field can not be empty').notEmpty();
  // req.checkBody('inputUsername', 'username must be between 4-15 characters long.').len(4, 15)
  // req.checkBody('inputPassword', 'password must be between 8-100 characters long..').len(8, 100)
  // req.checkBody('inputPassword', 'password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*)(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
  // req.checkBody('passwordMatch', 'password must be between 8-100 characters long.').len(8, 100)
  req.checkBody('passwordMatch', 'passwords do not match, please try again.').equals(inputPassword)

  const errors = req.validationErrors();
  if (errors) {
    console.log(`errors: ${JSON.stringify(errors)}`)
    res.json({posts: errors})
  }
  connection.query(query, body, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Failed to register user')
    } else {
      console.log(result)
      res.json({ msg: "congrats" })
    };
  });

});