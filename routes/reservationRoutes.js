const connection = require("./connection");
const express = require('express');
const router = express.Router();

module.exports = router;

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
        address, city, state, zipcode
    } = req.body;
    if (!startDateValue || !startTimeValue || !endDateValue || !endTimeValue || rateValue === "blank" ) {
        return res.send({
            success: false,
            spotSubtract: false
            // new_active_state: inputState
        });
    }
    console.log("local token", token)
    // console.log("active state change", inputState)

    const query = "INSERT INTO reservations(Token, MakerId, Longitude, Latitude, Address, City, State, Zipcode, Stay_Type, Start_Date, End_Date, Start_Time, End_Time, Car, Rate, Fee, Cost, Active, starttimer) VALUES (?, ?, '0', '0', ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Car', ?, ?, 0, false, '')";
    const input = [token, makerId, address, city, state, zipcode, rateType, startDateValue, endDateValue, startTimeValue, endTimeValue, rateValue, feeValue]

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
            return res.json(result);
        }
    })
});

//===========================================================================
// push stop time to database
//===========================================================================


router.post('/api/stop/timestamp/', (req, res) => {
    const { rowID, bill, makerID } = req.body
    // const dateNow = Date()
    const query = 'UPDATE reservations SET stoptimer = ? WHERE ID = ?'
    const date = new Date()
    console.log("DATE", new Date())
    const input = [date, rowID]
    connection.query(query, input, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Failed to push date')
        } else {
            // console.log(result)
            return res.json(result);
        }
    })

    const columnQuery = "SELECT * FROM users WHERE ID = ?;";
    connection.query(columnQuery, [makerID], (err, res) => {
        // catch any errors
        if (err) {
            console.log(err);
            return res.status(500).send('failed');
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

        connection.query(updateQuery, updateObject, (err, data) => {
            // catch any errors
            if (err) {
                console.log(err);
            };
            console.log(updatedBalance)
        });
    });
});