const mysql = require('mysql');
require('dotenv').config()

var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,  // your password
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    });
};

module.exports = connection;