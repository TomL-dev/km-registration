const express = require('express');
const db = require('../model/db');
const response = require('../functions/response');
const router = express.Router();

router.get('/', (req, res) => {
	db.getConnection((err, con) => {
		if (err) {
			response.sendDatabaseError(res, err);
		} else {
			con.query('SELECT * FROM km.car', (err, result, fields) => {
				con.release();
				if (err) {
					response.sendDatabaseError(res, err);
				} else {
					response.sendSuccessfullResponseMessage(res, result);
				}
			})
		}
	});
});

router.post('/', (req, res) => {
	// check if jwt contains admin role
	// if so, add new car to database

});
module.exports = router;