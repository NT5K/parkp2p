const connection = require("./connection");
const express = require('express');
const router = express.Router();

module.exports = router;

//===========================================================================
    //  get all reservations
//============================================================================

router.get('/api/reservations/', (req, res) => {
    const query = "SELECT * FROM reservations";     
    connection.query(query, (err, result) => {
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
    //  get reservations based on tokens
//============================================================================

router.get('/api/reservations/:token', (req, res) => {
    const query = "SELECT * FROM reservations WHERE Token = ?;";     
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
    //  get reservations based on makerID
//============================================================================

router.get('/api/reservations/maker/:token', (req, res) => {
    const query = "SELECT * FROM reservations WHERE MakerID = ?;";     
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
// create reservation / remove one to makers spot count
//===========================================================================

router.post('/api/reserve/spot', (req, res) => {
    const { 
        startDateValue,
        startTimeValue,
        endDateValue,
        endTimeValue,
        rateValue,
        rateType,
        feeValue,
        token,
        makerId,
        address, city, state, zipcode,
        name, phone,
        startDate,
        endDate
    } = req.body;
    // const PHONE = JSON.stringify(phone)
    // if (!startDateValue || !startTimeValue || !endDateValue || !endTimeValue || rateValue === "blank" ) {
    //     return res.send({
    //         success: false,
    //         spotSubtract: false
    //         // new_active_state: inputState
    //     });
    // }
    console.log("local token", token)
    // console.log("active state change", inputState)

    const query = "INSERT INTO reservations(Token, MakerId, Customer_Name, Phone_Number, Longitude, Latitude, Address, City, State, Zipcode, Stay_Type, Start_Date, End_Date, Start_Time, End_Time, Car, Rate, Fee, Cost, Active, starttimer) VALUES (?, ?, ?, ?, '0', '0', ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Car', ?, ?, 0, false, '')";
    const input = [token, makerId, name, phone, address, city, state, zipcode, rateType, startDate, endDate, startTimeValue, endTimeValue, rateValue, feeValue]

    connection.query(query, input, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("failed to create reservation")
        } else {
            return res.send({
                success: true,
                spotSubtract: true
                // new_active_state: inputState
            });
        };
    });

    const columnQuery = "SELECT * FROM users WHERE ID = ?;"; 
        connection.query(columnQuery, [makerId], (err, res) => {
        // catch any errors
        if (err) {
            console.log(err);
            return res.status(500).send('failed');
        };

        const updateQuery = "UPDATE users SET ? WHERE ?;";
        const updateSpotsCount = res[0].Spots - 1
        const updateObject = [
            {
                Spots: updateSpotsCount
            },
            {
                ID: makerId
            }
        ];

        connection.query(updateQuery, updateObject, (err, data) => {
            // catch any errors
            if (err) {
                console.log(err);
                return res.status(500).send('bfgsder');
            };
        });
    });
});
//===========================================================================
// delete reservation / add one to makers spot count
//===========================================================================
router.post('/api/reserve/remove', (req, res) => {
    const { makerID, rowID } = req.body

    const query1 = "DELETE FROM reservations WHERE ID = ?;";
    const input1 = [rowID];

    connection.query(query1, input1, (err, __) => {
        if (err) {
            console.log(err);
            return res.send({
                success: false,
                message: 'Error deleting'
            });
        }
        return res.send({
            success: true,
            message: 'success deleting'
        });
    });

    const columnQuery = "SELECT * FROM users WHERE ID = ?;";
    connection.query(columnQuery, [makerID], (err, res) => {
        // catch any errors
        if (err) {
            console.log(err);
            return res.status(500).send('failed');
        };

        const updateQuery = "UPDATE users SET ? WHERE ?;";
        const updateSpotsCount = res[0].Spots + 1
        const updateObject = [
            {
                Spots: updateSpotsCount
            },
            {
                ID: makerID
            }
        ];

        connection.query(updateQuery, updateObject, (err, data) => {
            // catch any errors
            if (err) {
                console.log(err);
                return res.send({
                    success: true,
                    message: 'success adding'
                });
            };
        });
    });
    
})

//===========================================================================
// delete reservation automatically
//===========================================================================
router.post('/api/reserve/remove/automatically', (req, res) => {
    const { makerID, rowID } = req.body

    const query1 = "DELETE FROM reservations WHERE ID = ?;";
    const input1 = [rowID];

    connection.query(query1, input1, (err, __) => {
        if (err) {
            console.log(err);
            return res.send({
                success: false,
                message: 'Error deleting'
            });
        }
        return res.send({
            success: true,
            message: 'success deleting'
        });
    });

    const columnQuery = "SELECT * FROM users WHERE ID = ?;";
    connection.query(columnQuery, [makerID], (err, res) => {
        // catch any errors
        if (err) {
            console.log(err);
            return res.status(500).send('failed');
        };

        const updateQuery = "UPDATE users SET ? WHERE ?;";
        const updateSpotsCount = res.Spots + 1
        const updateObject = [
            {
                Spots: updateSpotsCount
            },
            {
                ID: makerID
            }
        ];

        connection.query(updateQuery, updateObject, (err, data) => {
            // catch any errors
            if (err) {
                console.log(err);
            };
                    return res.send({
                        success: true,
                        message: 'success adding'
                    });
        });
    });
    
})


//===========================================================================
// push date to reservation row
//===========================================================================

router.post('/api/create/timestamp/', (req, res) => {
    const { rowID } = req.body
    // const dateNow = Date()
    const query = 'UPDATE reservations SET starttimer = ? WHERE ID = ?'
    const date = new Date()
    console.log("DATE", new Date())
    const input = [date, rowID]
    connection.query(query, input, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Failed to push date')
        } else {
            // console.log(result)
            // return res.json(result);return res.send({
            return res.send({
                success: true,
                message: 'added start time of reservation to database'
            });
        }
    })
});

//===========================================================================
// push stop time to database
//===========================================================================


router.post('/api/stop/timestamp/', (req, res) => {
    const {bill, makerID, Token, ID} = req.body


    const grabtokenid = "SELECT * FROM users WHERE ID = ?;";
    connection.query(grabtokenid, [Token], (err, res) => {
        // catch any errors
        if (err) {
            console.log(err);
            // return res.status(500).send('failed');
        };

        const tokenQuery = "UPDATE users SET ? WHERE ?;"
        const updatedTokenBalance = res[0].Credits - bill
        const updatedTokenObject = [
            {
                Credits: updatedTokenBalance
            },
            {
                ID: Token
            }
        ]
        connection.query(tokenQuery, updatedTokenObject, (err, _) => {
            // catch any errors
            if (err) {
                console.log(err);
            };
            // console.log(updatedBalance)
            console.log('this is credits from databse',res[0].Credits)
            
        });
    });

    const grabtokenid1 = "SELECT * FROM reservations WHERE ID = ?;";
    connection.query(grabtokenid1, [ID], (err, res) => {
        // catch any errors
        if (err) {
            console.log(err);
            // return res.status(500).send('failed');
        };

        const queryforActiveState = 'UPDATE reservations SET ? WHERE ?'
        const updatedTokenBalance = res[0].Active === 1
        console.log("should be one: ",updatedTokenBalance)
        const updatedTokenObject = [
            {
                Active: 1
            },
            {
                ID: ID
            }
        ]
        connection.query(queryforActiveState,updatedTokenObject, (err, _) => {
            // catch any errors
            if (err) {
                console.log(err);
            };
            // console.log(updatedBalance)
            // console.log('this is credits from databse',res[0].Credits)
            
        });
    });
    
    // const queryforActiveState = 'UPDATE reservations SET Active = true WHERE ID = ?'
    // connection.query(queryforActiveState, [ID], (err, _) => {
    //     // catch any errors
    //     if (err) {
    //         console.log(err);
    //     };
    //     // console.log(updatedBalance)
    //     // console.log('this is credits from databse',res[0].Credits)
        
    // });




    const columnQuery = "SELECT * FROM users WHERE ID = ?;";
    connection.query(columnQuery, [makerID], (err, res) => {
        // catch any errors
        if (err) {
            console.log(err);
            // return res.status(500).send('failed');
        };


        
        const updateQuery = "UPDATE users SET ? WHERE ?;";
        const updatedBalance = res[0].Balance + bill
        const updateObject = [
            {
                Balance: updatedBalance
            },
            {
                ID: makerID
            }
        ];
        console.log(res)
        connection.query(updateQuery, updateObject, (err, _) => {
            // catch any errors
            if (err) {
                console.log(err);
            };
            // console.log(updatedBalance)
            console.log('this is balance from databse',res[0].Balance)
            
        });
    });
                    return res.send({
                        success: true,
                        message: 'success adding'
                    });
});