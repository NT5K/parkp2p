const connection = require("./connection");
const express = require('express');
const router = express.Router();
const geocoder = require('google-geocoder');
const geo = geocoder({
    key: 'AIzaSyAJRWCPrSP6XMDKu-wlDMZy0rBNhPQjo4g'
});

module.exports = router;

//===========================================================================
// get personal info from token
//===========================================================================
router.get('/api/account/personal/:token', (req, res) => {
    const query = "Select Email, Name, Phone_Number, Address, City, Zipcode, State, Longitude, Latitude FROM users WHERE ID = ?;";
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
// verify address for long lat on database
//===========================================================================

router.post('/api/account/verify/address', (req, res) => {
    const { token, displayFullAddress } = req.body;

    console.log("local token", token)
    console.log("address to geolocate ", displayFullAddress)

    geo.find(displayFullAddress, function (err, res) {

        const { lat, lng } = res[0].location
        console.log("latitude ", lat, " longitude", lng)

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

//===========================================================================
// update name in dashboard
//===========================================================================
router.post('/api/account/update/name/', (req, res) => {
    const { token, fullName } = req.body;

    console.log("local token", token)
    console.log("first name change", fullName)

    if (!fullName) {
        return res.send({
            success: false,
            error: "name input cannot be blank"
        })
    }

    const query = "UPDATE users SET Name = ? WHERE ID = ?;";
    const input = [fullName, token]

    connection.query(query, input, (err, result) => {
        if (err) {
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
    console.log("email change", emailToPostRequest)

    if (!emailToPostRequest) {
        return res.send({
            success: false,
            error: "email input cannot be blank"
        })
    }

    const query = "UPDATE users SET Email = ? WHERE ID = ?;";
    const input = [emailToPostRequest, token]

    connection.query(query, input, (err, result) => {
        if (err) {
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
    console.log("phone number change", phone_numberToPostRequest)

    if (!phone_numberToPostRequest) {
        return res.send({
            success: false,
            error: "phone number input cannot be blank"
        })
    }

    const query = "UPDATE users SET Phone_Number = ? WHERE ID = ?;";
    const input = [phone_numberToPostRequest, token]

    connection.query(query, input, (err, result) => {
        if (err) {
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
    console.log("address change", addressToPostRequest)

    if (!addressToPostRequest) {
        return res.send({
            success: false,
            error: "address input cannot be blank"
        })
    }

    const query = "UPDATE users SET Address = ? WHERE ID = ?;";
    const input = [addressToPostRequest, token]

    connection.query(query, input, (err, result) => {
        if (err) {
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
    console.log("city change", cityToPostRequest)

    if (!cityToPostRequest) {
        return res.send({
            success: false,
            error: "city input cannot be blank"
        })
    }

    const query = "UPDATE users SET City = ? WHERE ID = ?;";
    const input = [cityToPostRequest, token]

    connection.query(query, input, (err, result) => {
        if (err) {
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
    console.log("state change", stateToPostRequest)

    if (!stateToPostRequest) {
        return res.send({
            success: false,
            error: "state input cannot be blank"
        })
    }

    const query = "UPDATE users SET State = ? WHERE ID = ?;";
    const input = [stateToPostRequest, token]

    connection.query(query, input, (err, result) => {
        if (err) {
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
    console.log("zipcode change", zipcodeToPostRequest)

    if (!zipcodeToPostRequest) {
        return res.send({
            success: false,
            error: "zip input cannot be blank"
        })
    }

    const query = "UPDATE users SET Zipcode = ? WHERE ID = ?;";
    const input = [zipcodeToPostRequest, token]

    connection.query(query, input, (err, result) => {
        if (err) {
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
