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