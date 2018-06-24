const express = require('express');
const db = require('../model/db');
const response = require('../functions/response');
const router = express.Router();

router.get('/', (req, res) => {
	db.getConnection((err, con) => {
		if (err) {
			response.sendDatabaseError(res, err);
		} else {
			con.query('SELECT * FROM km.km', (err, results, fields) => {
				con.release();
				if (err) {
					response.sendDatabaseError(res, err);
				} else {
					response.sendSuccessfullResponseMessage(res, results);
				}
			});
		}
	});
});

router.post('/', (req, res) => {
	const body = req.body;
	const params = {
		'date': body.date,
		'location': body.location,
		'milage': body.milage,
		'reason': body.reason,
		'triptype': body.triptype,
		'fkcar': body.car
	}
	db.getConnection((err, con) => {
		if (err) {
			response.sendDatabaseError(req, err);
		} else {
			con.query('INSERT INTO km.km SET ?', params, (error, results) => {
				con.release();
				if (error) {
					response.sendDatabaseError(res, error);
				} else {
					response.sendSuccessfullResponseObject(res, {
						'message': 'successfully added :)',
						'results': results
					});
				}
			});
		}
	});
});

module.exports = router;