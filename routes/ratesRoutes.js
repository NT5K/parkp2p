const connection = require("./connection");
const express = require('express');
const router = express.Router();

module.exports = router;

//===========================================================================
// get rates info info from token
//===========================================================================
router.get('/api/account/rates/:token', (req, res) => {
    const query = "Select Address, Spots, City, Zipcode, State, Hourly, Daily, Weekly, Monthly, Overnight, Active_State, Description, Instructions FROM users WHERE ID = ?;";
    const { token } = req.params
    const input = [token]
    connection.query(query, input, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Failed to get info')
        } else {

            return res.json(result);
        
        };
    });
});

//===========================================================================
  // update active state in dashboard
//===========================================================================

router.post('/api/account/update/active', (req, res) => {
  const { token, inputState } = req.body;
  
  console.log("local token", token)
  console.log("active state change", inputState)
  
  const query = "UPDATE users SET Active_State = ? WHERE ID = ?;";
  const input = [inputState, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update active state")
    } else {
      return res.send({
        success: true,
        new_active_state: inputState
      });
    };
  });
});

//===========================================================================
  // update spots state in dashboard
//===========================================================================

router.post('/api/account/update/spots', (req, res) => {
    const { token, spotsToPostRequest } = req.body;
    
    console.log("local token", token)
    console.log("active state change", spotsToPostRequest)
    
    const query = "UPDATE users SET Spots = ? WHERE ID = ?;";
    const input = [spotsToPostRequest, token ]
  
    connection.query(query, input, (err, result) => {
      if(err) {
        console.log(err);
        return res.status(500).send("failed to update active state")
      } else {
        return res.send({
          success: true,
          new_active_state: spotsToPostRequest
        });
      };
    });
  });

//===========================================================================
  // update description in dashboard
//===========================================================================

router.post('/api/account/update/description', (req, res) => {
  const { token, descriptionToPostRequest } = req.body;
  
  console.log("local token", token)
  console.log("description change", descriptionToPostRequest)
  
  const query = "UPDATE users SET Description = ? WHERE ID = ?;";
  const input = [descriptionToPostRequest, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update description")
    } else {
      return res.send({
        success: true,
        new_description: descriptionToPostRequest
      });
    };
  });
});

//===========================================================================
  // update instructions in dashboard
//===========================================================================

router.post('/api/account/update/instructions', (req, res) => {
    const { token, instructionsToPostRequest } = req.body;
    
    console.log("local token", token)
    console.log("instructions change", instructionsToPostRequest)
    
    const query = "UPDATE users SET Instructions = ? WHERE ID = ?;";
    const input = [instructionsToPostRequest, token ]
  
    connection.query(query, input, (err, result) => {
      if(err) {
        console.log(err);
        return res.status(500).send("failed to update instructions")
      } else {
        return res.send({
          success: true,
          new_instructions: instructionsToPostRequest
        });
      };
    });
  });

//===========================================================================
// update hourly rate in dashboard
//===========================================================================
router.post('/api/account/update/rates/hourly', (req, res) => {
    const { token, hourlyToPostRequest } = req.body;

    console.log("local token", token)
    console.log("hourly change", hourlyToPostRequest)

    if (!hourlyToPostRequest) {
        return res.send({
            success: false,
            error: "hourly input cannot be blank"
        })
    }

    const query = "UPDATE users SET Hourly = ? WHERE ID = ?;";
    const input = [hourlyToPostRequest, token]

    connection.query(query, input, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("failed to update hourly rate")
        } else {
            return res.send({
                success: true,
                new_hourly_rate: hourlyToPostRequest
            });
        };
    });
});

//===========================================================================
// update daily rate in dashboard
//===========================================================================

router.post('/api/account/update/rates/daily', (req, res) => {
    const { token, dailyToPostRequest } = req.body;

    console.log("local token", token)
    console.log("daily change", dailyToPostRequest)

    if (!dailyToPostRequest) {
        return res.send({
            success: false,
            error: "daily input cannot be blank"
        })
    }

    const query = "UPDATE users SET Daily = ? WHERE ID = ?;";
    const input = [dailyToPostRequest, token]

    connection.query(query, input, (err, result) => {
        if (err) {
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

//===========================================================================
// update weekly rate in dashboard
//===========================================================================

router.post('/api/account/update/rates/weekly', (req, res) => {
    const { token, weeklyToPostRequest } = req.body;

    console.log("local token", token)
    console.log("weekly change", weeklyToPostRequest)

    if (!weeklyToPostRequest) {
        return res.send({
            success: false,
            error: "weekly input cannot be blank"
        })
    }

    const query = "UPDATE users SET Weekly = ? WHERE ID = ?;";
    const input = [weeklyToPostRequest, token]

    connection.query(query, input, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("failed to update weekly rate")
        } else {
            return res.send({
                success: true,
                new_weekly_rate: weeklyToPostRequest
            });
        };
    });
});

//===========================================================================
// update monthly rate in dashboard
//===========================================================================

router.post('/api/account/update/rates/monthly', (req, res) => {
    const { token, monthlyToPostRequest } = req.body;

    console.log("local token", token)
    console.log("monthly change", monthlyToPostRequest)

    if (!monthlyToPostRequest) {
        return res.send({
            success: false,
            error: "monthly input cannot be blank"
        })
    }

    const query = "UPDATE users SET Monthly = ? WHERE ID = ?;";
    const input = [monthlyToPostRequest, token]

    connection.query(query, input, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("failed to update monthly rate")
        } else {
            return res.send({
                success: true,
                new_monthly_rate: monthlyToPostRequest
            });
        };
    });
});

//===========================================================================
// update overnight rate in dashboard
//===========================================================================

router.post('/api/account/update/rates/overnight', (req, res) => {
    const { token, overnightToPostRequest } = req.body;

    console.log("local token", token)
    console.log("overnight change", overnightToPostRequest)

    if (!overnightToPostRequest) {
        return res.send({
            success: false,
            error: "overnight input cannot be blank"
        })
    }

    const query = "UPDATE users SET Overnight = ? WHERE ID = ?;";
    const input = [overnightToPostRequest, token]

    connection.query(query, input, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("failed to update overnight rate")
        } else {
            return res.send({
                success: true,
                new_overnight_rate: overnightToPostRequest
            });
        };
    });
});