const mysql = require('mysql');
require('dotenv').config()

var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection({
        host: 'v02yrnuhptcod7dk.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 	"aozs6jzl699tlqgd",
        password: "w5p4hrzpzrvcs182",  // your password
        database: "oi7dfptdy8jfy4dq",
        port: 	3306
    });
};

module.exports = connection;