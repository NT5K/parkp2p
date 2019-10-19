const mysql = require('mysql');
require('dotenv').config()

let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection({
        host: process.env.JAWSDB_HOST_3,
        user: process.env.JAWSDB_USER_3,
        password: process.env.JAWSDB_PASSWORD_3,
        database: process.env.JAWSDB_DATABASE_3,
        port: process.env.JAWSDB_PORT_3
    });
};

module.exports = connection;