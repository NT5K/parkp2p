const connection = require("./connection");
const express = require('express');
const router = express.Router();

module.exports = router;

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
    const input = [inputSubscription, token]

    connection.query(query, input, (err, result) => {
        if (err) {
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