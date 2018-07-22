const db = require('../model/db');

const createDatabase = 'CREATE DATABASE IF NOT EXISTS ' + process.env.DB_NAME;
const createTable_car = 'CREATE TABLE IF NOT EXISTS ' + process.env.DB_NAME + '.car (' +
	'idcar INT NOT NULL AUTO_INCREMENT, ' +
	'brand varchar(50) NOT NULL, ' +
	'model varchar(50) NOT NULL, ' +
	'licence varchar(8) NOT NULL, ' +
	'datestart INT NOT NULL, ' +
	'dateend INT, ' +
	'startmilage INT NOT NULL, ' +
	'PRIMARY KEY(idcar));'
const createTable_km = 'CREATE TABLE IF NOT EXISTS ' + process.env.DB_NAME + '.km ( ' +
	'id INT NOT NULL AUTO_INCREMENT, ' +
	'date INT NOT NULL, ' +
	'location varchar(50) NOT NULL, ' +
	'milage INT NOT NULL, ' +
	'reason varchar(150), ' +
	'triptype INT NOT NULL, ' +
	'fkcar INT NOT NULL, ' +
	'PRIMARY KEY(id),' +
	'CONSTRAINT FK_CAR FOREIGN KEY(fkcar) REFERENCES car(idcar)); ';

async function checkDatabaseOnStartup() {
	try {
		await doQuery(createDatabase)

		let resultCar = await doQuery(createTable_car);
		let resultKm = await doQuery(createTable_km);
		console.log(`results: car: ${resultCar}, km: ${resultKm}`)
	} catch (err) {
		console.log('error in checkDatabaseOnStartup');
	}
}

function doQuery(query) {
	return new Promise((resolve, reject) => {
		db.getConnection((err, con) => {
			if (err) {
				console.log('could not get connection: ' + err);
				reject(false);
			} else {
				con.query(query, (err, results) => {
					con.release();
					if (err) {
						console.log('error in query: ' + err);
						reject(false);
					} else {
						console.log(`executing query: ${query}`)
						resolve(true);
					}
				});
			}
		});
	});
}

module.exports.checkDatabaseOnStartup = checkDatabaseOnStartup;