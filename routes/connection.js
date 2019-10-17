const mysql = require('mysql');
require('dotenv').config()

let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection({
        host: process.env.JAWSDB_HOST_2,
        user: process.env.JAWSDB_USER_2,
        password: process.env.JAWSDB_PASSWORD_2,
        database: process.env.JAWSDB_DATABASE_2,
        port: process.env.JAWSDB_PORT_2
    });
};

module.exports = connection;