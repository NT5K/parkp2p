const mysql = require('mysql');
require('dotenv').config()

let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection({
        host: process.env.JAWSDB_HOST_4,
        user: process.env.JAWSDB_USER_4,
        password: process.env.JAWSDB_PASSWORD_4,
        database: process.env.JAWSDB_DATABASE_4,
        port: process.env.JAWSDB_PORT_4
    });
};

module.exports = connection;