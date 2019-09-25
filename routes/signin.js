const connection = require("./connection");
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = router;

const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

function validPassword(password, databasePass) {
    return bcrypt.compareSync(password, databasePass);
};

// function validPassword(password) {
//     return bcrypt.compareSync(password, this.password)
// }
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


   
        const query = "INSERT INTO driveways(Email, Pass) VALUES(?, ?);";
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
    const query = "SELECT * FROM driveways WHERE Email = ?;";
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
                message: 'Error: Invalid'
            });
        }
        // const user = users[0];
        // if (!user.validPassword(inputPassword, user.Pass)) {
        //     return res.send({
        //         success: false,
        //         message: 'Error: Invalid'
        //     });
        // }

        // create session
        const query2 = "INSERT INTO UserSessions(_id) VALUES (?);";
        const input2 = [ID];
        connection.query(query2, input2, (err, doc) => {
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
                token: doc._id
            });
        });
    });
});