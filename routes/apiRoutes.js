
const connection = require("./connection");
const express = require('express');
const router = express.Router();
const geocoder = require('google-geocoder');
const geo = geocoder({
  key: 'AIzaSyAJRWCPrSP6XMDKu-wlDMZy0rBNhPQjo4g'
});

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
router.get('/api/account/personal/car/:token', (req, res) => {
  const query = "Select Car_Year, Car_Make, Car_Model, Car_Color FROM users WHERE ID = ?;";
  const { token } = req.params
  const input = [token]
  connection.query(query, input, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Failed to get car make model')
    } else {
      // console.log(result)
      return res.json(result);
    };
  });
})

//===========================================================================
// get subscription info info from token
//===========================================================================
router.get('/api/account/subscription/plan/:token', (req, res) => {
  const query = "Select Subscription FROM users WHERE ID = ?;";
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
  // update car make in dashboard
//===========================================================================

router.post('/api/account/update/car/make', (req, res) => {
  const { token, carMakeToPostRequest } = req.body;
  
  console.log("local token", token)
  console.log("overnight change", carMakeToPostRequest)

  if (!carMakeToPostRequest) {
    return res.send({
      success: false,
      error: "car make input cannot be blank"
    })
  }
  
  const query = "UPDATE users SET Car_Make = ? WHERE ID = ?;";
  const input = [carMakeToPostRequest, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update car make")
    } else {
      return res.send({
        success: true,
        new_car_make: carMakeToPostRequest
      });
    };
  });
});

//===========================================================================
  // update car model in dashboard
//===========================================================================

router.post('/api/account/update/car/model', (req, res) => {
  const { token, carModelToPostRequest } = req.body;
  
  console.log("local token", token)
  console.log("overnight change", carModelToPostRequest)

  if (!carModelToPostRequest) {
    return res.send({
      success: false,
      error: "car Model input cannot be blank"
    })
  }
  
  const query = "UPDATE users SET Car_Model = ? WHERE ID = ?;";
  const input = [carModelToPostRequest, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update car Model")
    } else {
      return res.send({
        success: true,
        new_car_Model: carModelToPostRequest
      });
    };
  });
});

//===========================================================================
  // update car color in dashboard
//===========================================================================

router.post('/api/account/update/car/color', (req, res) => {
  const { token, carColorToPostRequest } = req.body;
  
  console.log("local token", token)
  console.log("overnight change", carColorToPostRequest)

  if (!carColorToPostRequest) {
    return res.send({
      success: false,
      error: "car Color input cannot be blank"
    })
  }
  
  const query = "UPDATE users SET Car_Color = ? WHERE ID = ?;";
  const input = [carColorToPostRequest, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update car Color")
    } else {
      return res.send({
        success: true,
        new_car_Color: carColorToPostRequest
      });
    };
  });
});

//===========================================================================
  // update subscription plan in dashboard
//===========================================================================

router.post('/api/account/subscription/plan/update', (req, res) => {
  const { token, inputSubscription } = req.body;
  
  console.log("local token", token)
  console.log("overnight change", inputSubscription)

  if (!inputSubscription) {
    return res.send({
      success: false,
      error: "invalid"
    })
  }
  
  const query = "UPDATE users SET Subscription = ? WHERE ID = ?;";
  const input = [inputSubscription, token ]

  connection.query(query, input, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).send("failed to update")
    } else {
      return res.send({
        success: true,
        subscription: inputSubscription
      });
    };
  });
});

//===========================================================================
  // verify address for long lat on database
//===========================================================================

router.post('/api/account/verify/address', (req, res) => {
  const { token, displayFullAddress } = req.body;
  
  console.log("local token", token)
  console.log("address to geolocate ", displayFullAddress)

  geo.find(displayFullAddress, function (err, res) {

    const { lat, lng } = res[0].location
    console.log("latitude ",lat, " longitude", lng)

    const query = "UPDATE users SET Latitude = ?, Longitude = ? WHERE ID = ?;";
    const input = [lat, lng, token]

    connection.query(query, input, (err, __) => {
      if (err) {
        console.log(err);
        return res.status(500).send("failed to set lat lng")
      }
    });
  });

  return res.send({
    success: true,
    message: "Verified"
  });
});


  
  // const query = "UPDATE users SET Overnight = ? WHERE ID = ?;";
  // const input = [overnightToPostRequest, token ]

  // connection.query(query, input, (err, result) => {
  //   if(err) {
  //     console.log(err);
  //     return res.status(500).send("failed to update overnight rate")
  //   } else {
  //     return res.send({
  //       success: true,
  //       new_overnight_rate: overnightToPostRequest
  //     });
  //   };
  // });


//============================================================================
