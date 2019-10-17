const mysql = require('mysql');
require('dotenv').config()

let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection({
        host: process.env.JAWSDB_HOST2,
        user: process.env.JAWSDB_USER2,
        password: process.env.JAWSDB_PASSWORD2,
        database: process.env.JAWSDB_DATABASE2,
        port: process.env.JAWSDB_PORT2
    });
};

module.exports = connection;