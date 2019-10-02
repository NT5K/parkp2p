const connection = require("./connection");
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const store = require('store')

module.exports = router;

const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// function validPassword(password, databasePass) {
//     return bcrypt.compareSync(password, databasePass);
// };

function validPassword(password) {
    return bcrypt.compareSync(password, this.password)
}
//===========================================================================

/* SIGN UP TODO:
    Duplicate email addresses crashes
*/
//===========================================================================
router.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const { inputPassword } = body;
    let { inputEmail } = body;

    if (!inputEmail) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }
    if (!inputPassword) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }
    inputEmail = inputEmail.toLowerCase();
    inputEmail = inputEmail.trim();

    // const query1 = " SELECT Email FROM driveways;"
    // connection.query(query1, (err, data) => {
    //     const mappedArray = data.map(x => x === inputEmail)
    //     console.log(mappedArray)
    //     if (mappedArray === inputEmail) {
    //         return res.send({
    //             success: false,
    //             message: 'Error: username already exists.'
    //         });
    //     }
    // })


    
    const query = "INSERT INTO users (Email, Pass, First_Name, Last_Name, Phone_Number, Address, Address_Extra, City, State, Zip, Longitude, Latitude, Spots, Active_State, Hourly, Daily, Weekly, Monthly, Overnight, Balance) VALUES (?, ?, null, null, null, null, null, null, null, null, null, null, null, false, null, null, null, null, null, null);";
        const input = [inputEmail, generateHash(inputPassword)];
        // console.log(body)
        connection.query(query, input, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Failed to register user')
            } else {
                console.log(result)
                res.json({ msg: "congrats" })
                
            };
        });
})

//===========================================================================

/* SIGN IN TODO:
    verify password is correct
*/
//===========================================================================
router.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const { inputPassword } = body;
    let { inputEmail } = body;
    if (!inputEmail) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }
    if (!inputPassword) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }
    inputEmail = inputEmail.toLowerCase();
    inputEmail = inputEmail.trim();

    // const query = "SELECT Email, Pass FROM driveways;";
    const query = "SELECT * FROM users WHERE Email = ?;";
    const input = [inputEmail];
    // console.log(body)
    connection.query(query, input, (err, users) => {
        const { ID } = users[0]
        console.log(users[0].ID)
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
        // const user = users[0];
        // if (!user.validPassword(inputPassword)) {
        //     return res.send({
        //         success: false,
        //         message: 'Error: Invalid'
        //     });
        // }

        // create session
        const query2 = "INSERT INTO UserSessions(_id) VALUES (?);";
        const input2 = [ID];
        connection.query(query2, input2, (err, __) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
            // console.log("returned", doc._id)
            return res.send({
                success: true,
                message: 'Valid sign in',
                test: "test message",
                token: input2
            });
        });
    });
});

//===========================================================================
// Verify session is on the database

router.get('/api/account/verify', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    const query3 = "SELECT _id FROM UserSessions WHERE !idDeleted and _id = ?;";
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

router.delete('/api/account/logout/:token', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    const input = [req.params.token]
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    // localStorage.removeItem('park_p2p')
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
            console: token
        });
    })
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