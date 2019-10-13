const mysql = require('mysql');
require('dotenv').config()

const connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection({
        host: process.env.JAWSDB_HOST,
        user: process.env.JAWSDB_USER,
        password: process.env.JAWSDB_PASSWORD,
        database: process.env.JAWSDB_DATABASE,
        port: process.env.JAWSDB_PORT
    });
};

module.exports = connection;