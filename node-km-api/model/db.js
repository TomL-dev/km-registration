const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
	connectionLimit: 100,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
	debug: false
});
module.exports = pool;
// module.exports.pool = pool;
// module.exports.getInitialConnection = initialConnection;