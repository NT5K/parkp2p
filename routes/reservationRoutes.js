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
// create reservation
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
    if (!startDateValue || !startTimeValue || !endDateValue || !endTimeValue || !rateValue ) {
        return res.send({
            success: false,
            spotSubtract: false
            // new_active_state: inputState
        });
    }
    console.log("local token", token)
    // console.log("active state change", inputState)

    const query = "INSERT INTO reservations(Token, MakerId, Longitude, Latitude, Address, City, State, Zipcode, Stay_Type, Start_Date, End_Date, Start_Time, End_Time, Car, Rate, Fee, Cost, Active) VALUES (?, ?, '0', '0', ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Car', ?, ?, 0, false)";
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