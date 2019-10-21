
const connection = require("./connection");
const express = require('express');
const router = express.Router();
const store = require('store')
require('dotenv').config()

const bcrypt = require('bcrypt');
const saltRounds = JSON.parse(process.env.SALT_ROUNDS);

module.exports = router;

//===========================================================================
    // Sign-up user
//===========================================================================

router.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const { inputPassword, inputPasswordCheck } = body;
    let { inputEmail } = body;

    if (!inputEmail) {
        return res.send({
            success: false,
            message: 'Email cannot be blank.'
        });
    }
    if (!inputPassword) {
        return res.send({
            success: false,
            message: 'Password cannot be blank.'
        });
    }
    if (inputPassword !== inputPasswordCheck) {
        return res.send({
            success: false,
            message: 'Passwords do not match.'
        });
    }
    console.log(inputPassword)
    // email lowercase and trim
    inputEmail = inputEmail.toLowerCase().trim();
    
    // generate hashed password
    const hashedPass = bcrypt.hashSync(inputPassword, saltRounds);

    // query's for database
    const query = "INSERT INTO users (Email, Pass, Name, Phone_Number, Address, City, State, Zipcode, Longitude, Latitude, Car_Year, Car_Make, Car_Model, Car_Color, Spots, Active_State, Hourly, Daily, Weekly, Monthly, Overnight, Balance, Credits, Subscription, Description, Instructions) VALUES (?, ?, 'John Smith', '9871234321', '4321 Default Address Rd', 'New York', 'NY', '90210', null, null, 2112, 'make', 'model', 'color', 0, false, 1, 10, 40, 120, 12, 0, 500, 0,  'This will be the spot where your description sits. Should contain details about the area and what makes your driveway a good spot.', 'This is where some parking instructions will be. Describe where a car should be parked in your driveway.');";
    const input = [inputEmail, hashedPass];

    connection.query(query, input, (err, result) => {
        if (err) {
        return res.send({
            success: false,
            message: 'Invalid email address'
        });
        } else {
            console.log(result)
            return res.json({ message: "congrats" })
        };
    });
})

//===========================================================================
   // Sign-in user              TODO: duplicate emails break page (fixed!)
//===========================================================================

router.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const { inputPassword } = body;
    let { inputEmail } = body;

    if (!inputEmail) {
        return res.send({
            success: false,
            message: 'Email cannot be blank.'
        });
    }
    if (!inputPassword) {
        return res.send({
            success: false,
            message: 'Password cannot be blank.'
        });
    }

    // email lowercase and trim
    inputEmail = inputEmail.toLowerCase().trim();
    // console.log("inputEmail = ", inputEmail)

    // query database, check if row with inputEmail exists ( returns 0 or 1 )
    const query1 = "SELECT EXISTS(SELECT * FROM users WHERE Email = ? LIMIT 1)";
    const input1 = [inputEmail];

    connection.query(query1, input1, (err, check) => {

        const userExistsCheck = JSON.parse(Object.values(check[0]))
        console.log("does user exist? = ", userExistsCheck)

        if (userExistsCheck === 0) {
            return res.send({
                success: false,
                message: 'User does not exist'
            });
        } 
        else if (err) {
            console.log('err 1:', err);
            return res.send({
                success: false,
                message: 'Error: server error'
            });
        } 
        else {
    
        // if email exists, query database for pass to decrypt
        const query = "SELECT * FROM users WHERE Email = ?;";
        const input = [inputEmail];

        connection.query(query, input, (err, users) => {

            const { Pass, ID } = users[0]
            
            const decryptedPass = bcrypt.compareSync(inputPassword, Pass)
            console.log("decrypted pass true or false: ", decryptedPass)
            
            if (!decryptedPass) {
                return res.send({
                    success: false,
                    message: 'Incorrect email or password'
                });
            }
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }

            // create session on database
            const query2 = "INSERT INTO usersessions(_id) VALUES (?);";
            const input2 = [ID];
            // const hashedEmail = bcrypt.hashSync(Email, saltRounds);
            // const input2 = [JSON.stringify(hashedEmail)];

            connection.query(query2, input2, (err, __) => {
                if (err) {
                    console.log(err);
                    return res.send({
                        success: false,
                        message: 'Error: server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    test: "test message",
                    token: input2
                });
            });
        });
    }})
});

//===========================================================================
// Verify session is on the database
//===========================================================================

router.get('/api/account/verify', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;

    // Verify the token is one of a kind and it's not deleted.
    const query3 = "SELECT _id FROM usersessions WHERE _id = ?;";
    const input3 = [token];

    connection.query(query3, input3, (err, sessions) => {
        if (err) {
            console.log(err);
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        if (sessions.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        } else {
            // DO ACTION
            return res.send({
                success: true,
                message: 'Good'
            });
        }
    })
});

//===========================================================================
// log user out of local session and session on database
//===========================================================================

router.delete('/api/account/logout/:token', (req, res, next) => {

    const { query } = req;
    const { token } = query;
    const input = [req.params.token]

    const query4 = 'DELETE FROM usersessions WHERE _id = ?;'
    const input4 = [token];

    connection.query(query4, input, (err, sessions) => {
        if (err) {
            console.log(err);
            return res.send({
                success: false,
                message: 'Error: Server error',
                token: token
            });
        }
        store.remove('park_p2p')
        return res.send({
            success: true,
            message: 'Session Deleted',
            token: token
        });
    })
});
//===========================================================================
// delete account from database, requires correct password
//===========================================================================

router.post('/api/account/delete', (req, res, next) => {
    const { token, passwordToPostRequest } = req.body;
    // const { token } = req.params
    console.log(token, passwordToPostRequest)

    if (!passwordToPostRequest) {
        return res.send({
            success: false,
            message: 'Password cannot be blank.'
        });
    }

    // query's for database
    const query = "SELECT * FROM users WHERE ID = ?;";
    const input = [token];

    connection.query(query, input, (err, users) => {
        const { Pass, ID, Email } = users[0]
        const decryptedPass = bcrypt.compareSync(passwordToPostRequest, Pass)
        console.log("decrypted pass true or false: ", decryptedPass)
        console.log(ID)
        // if input password does not match database
        if (!decryptedPass) {
            return res.send({
                success: false,
                message: 'Incorrect password'
            });
        }
        if (err) {
            console.log('err 2:', err);
            return res.send({
                success: false,
                message: 'Error: server error'
            });
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid User'
            });
        }

        // create session on database
        const query2 = "DELETE FROM users WHERE ID = ?;";
        const input2 = [token];
        // const hashedEmail = bcrypt.hashSync(Email, saltRounds);
        // const input2 = [JSON.stringify(hashedEmail)];

        connection.query(query2, input2, (err, __) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
            // store.remove('park_p2p')
            return res.send({
                success: true,
                message: 'Valid deletion of user',
                test: "test message",
                token: input2
            });
        });
    });
});

//functions for removing spaces for geolocation api
// $(function () {
//     $(empEventCity).val(function (_, v) {
//       return v.replace(/\s+/g, '');
//     });
//   });
//   $(function () {
//     $(empEventAddress).val(function (_, v) {
//       return v.replace(/\s+/g, '');
//     });
//   });

//   //identifying variables for query
//   const location = empEventAddress + empEventCity + state
//   const geolocatorURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
//     location + '&key=AIzaSyAJRWCPrSP6XMDKu-wlDMZy0rBNhPQjo4g'
//   console.log(geolocatorURL);

//   // query geolocatorURL
//   $.ajax({
//     url: geolocatorURL,
//     method: "GET"
//   }).then(function (response) {

//     // json variables for lng,lat
//     const latitude = response.results[0].geometry.location.lat;
//     const longitude = response.results[0].geometry.location.lng;