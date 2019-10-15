
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
    if(err) {
      console.log(err);
      return res.status(500).send("Failed to retrieve Data")
    } else {
      return res.json(result);
    };
  });
});

//searchbar code===============================================================
router.get('/api/public/searchbar', (req, res) => {
  const { searchInput } = req.body

  
})

//===========================================================================
// get personal info from token
//===========================================================================
router.get('/api/account/personal/:token', (req, res) => {
  const query = "Select Email, Name, Phone_Number, Address, City, Zipcode, State FROM users WHERE ID = ?;";
  const { token } = req.params
  const input = [token]
  connection.query(query, input, (err, result) => {
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
// get rates info info from token
//===========================================================================
router.get('/api/account/rates/:token', (req, res) => {
  const query = "Select Address, City, Zipcode, State, Hourly, Daily, Weekly, Monthly, Overnight, Description, Active_State FROM users WHERE ID = ?;";
  const { token } = req.params
  const input = [token]
  connection.query(query, input, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Failed to get info')
    } else {
      // console.log(result)
      return res.json(result);
    };
  });
});

//===========================================================================
  // update name in dashboard
//===========================================================================
router.post('/api/account/update/name/', (req, res) => {
  const { token, fullName } = req.body;
  
  console.log("local token", token)
  console.log("first name change", fullName)
  
  const query = "UPDATE users SET Name = ? WHERE ID = ?;";
  const input = [fullName, token ]

  if (!fullName) { 
    return res.send({
      success: false,
      error: "name input cannot be blank"
    })
  }

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update first name")
    } else {
      return res.send({
        success: true,
        new_name: fullName
      });
    };
  });
});

//===========================================================================
  // update email in dashboard
//===========================================================================
router.post('/api/account/update/email/', (req, res) => {
  const { token, emailToPostRequest } = req.body;
  
  console.log("local token", token)
  console.log("first name change", emailToPostRequest)
  
  const query = "UPDATE users SET Email = ? WHERE ID = ?;";
  const input = [emailToPostRequest, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update email")
    } else {
      return res.send({
        success: true,
        new_email: emailToPostRequest
      });
    };
  });
});

//===========================================================================
  // update phone number in dashboard
//===========================================================================
router.post('/api/account/update/phone/', (req, res) => {
  const { token, phone_numberToPostRequest } = req.body;
  
  console.log("local token", token)
  console.log("first name change", phone_numberToPostRequest)
  
  const query = "UPDATE users SET Phone_Number = ? WHERE ID = ?;";
  const input = [phone_numberToPostRequest, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update phone number")
    } else {
      return res.send({
        success: true,
        new_phone: phone_numberToPostRequest
      });
    };
  });
});

//===========================================================================
  // update address in dashboard
//===========================================================================
router.post('/api/account/update/address/', (req, res) => {
  const { token, addressToPostRequest } = req.body;
  
  console.log("local token", token)
  console.log("first name change", addressToPostRequest)
  
  const query = "UPDATE users SET Address = ? WHERE ID = ?;";
  const input = [addressToPostRequest, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update address")
    } else {
      return res.send({
        success: true,
        new_address: addressToPostRequest
      });
    };
  });
});

//===========================================================================
  // update city in dashboard
//===========================================================================
router.post('/api/account/update/city/', (req, res) => {
  const { token, cityToPostRequest } = req.body;
  
  console.log("local token", token)
  console.log("first name change", cityToPostRequest)
  
  const query = "UPDATE users SET City = ? WHERE ID = ?;";
  const input = [cityToPostRequest, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update city")
    } else {
      return res.send({
        success: true,
        new_city: cityToPostRequest
      });
    };
  });
});

//===========================================================================
  // update state in dashboard
//===========================================================================
router.post('/api/account/update/state/', (req, res) => {
  const { token, stateToPostRequest } = req.body;
  
  console.log("local token", token)
  console.log("first name change", stateToPostRequest)
  
  const query = "UPDATE users SET State = ? WHERE ID = ?;";
  const input = [stateToPostRequest, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update state")
    } else {
      return res.send({
        success: true,
        new_state: stateToPostRequest
      });
    };
  });
});

//===========================================================================
  // update zipcode in dashboard
//===========================================================================
router.post('/api/account/update/zipcode/', (req, res) => {
  const { token, zipcodeToPostRequest } = req.body;
  
  console.log("local token", token)
  console.log("first name change", zipcodeToPostRequest)
  
  const query = "UPDATE users SET Zipcode = ? WHERE ID = ?;";
  const input = [zipcodeToPostRequest, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update zipcode")
    } else {
      return res.send({
        success: true,
        new_zipcode: zipcodeToPostRequest
      });
    };
  });
});

//===========================================================================
  // update daily rate in dashboard
//===========================================================================
router.post('/api/account/update/rates/hourly', (req, res) => {
  const { token, hourlyToPostRequest } = req.body;
  
  console.log("local token", token)
  console.log("first name change", hourlyToPostRequest)
  
  const query = "UPDATE users SET Hourly = ? WHERE ID = ?;";
  const input = [hourlyToPostRequest, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update daily rate")
    } else {
      return res.send({
        success: true,
        new_hourly_rate: hourlyToPostRequest
      });
    };
  });
});

router.post('/api/account/update/rates/daily', (req, res) => {
  const { token, dailyToPostRequest } = req.body;
  
  console.log("local token", token)
  console.log("first name change", dailyToPostRequest)
  
  const query = "UPDATE users SET Daily = ? WHERE ID = ?;";
  const input = [dailyToPostRequest, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update daily rate")
    } else {
      return res.send({
        success: true,
        new_daily_rate: dailyToPostRequest
      });
    };
  });
});

router.post('/api/account/update/rates/weekly', (req, res) => {
  const { token, weeklyToPostRequest } = req.body;
  
  console.log("local token", token)
  console.log("first name change", weeklyToPostRequest)
  
  const query = "UPDATE users SET Weekly = ? WHERE ID = ?;";
  const input = [weeklyToPostRequest, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update daily rate")
    } else {
      return res.send({
        success: true,
        new_weekly_rate: weeklyToPostRequest
      });
    };
  });
});

router.post('/api/account/update/rates/monthly', (req, res) => {
  const { token, monthlyToPostRequest } = req.body;
  
  console.log("local token", token)
  console.log("first name change", monthlyToPostRequest)
  
  const query = "UPDATE users SET Monthly = ? WHERE ID = ?;";
  const input = [monthlyToPostRequest, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update daily rate")
    } else {
      return res.send({
        success: true,
        new_monthly_rate: monthlyToPostRequest
      });
    };
  });
});

router.post('/api/account/update/rates/overnight', (req, res) => {
  const { token, overnightToPostRequest } = req.body;
  
  console.log("local token", token)
  console.log("first name change", overnightToPostRequest)
  
  const query = "UPDATE users SET Overnight = ? WHERE ID = ?;";
  const input = [overnightToPostRequest, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update daily rate")
    } else {
      return res.send({
        success: true,
        new_overnight_rate: overnightToPostRequest
      });
    };
  });
});

router.post('/api/account/update/description', (req, res) => {
  const { token, descriptionToPostRequest } = req.body;
  
  console.log("local token", token)
  console.log("first name change", descriptionToPostRequest)
  
  const query = "UPDATE users SET Description = ? WHERE ID = ?;";
  const input = [descriptionToPostRequest, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update daily rate")
    } else {
      return res.send({
        success: true,
        new_description_rate: descriptionToPostRequest
      });
    };
  });
});
//============================================================================
