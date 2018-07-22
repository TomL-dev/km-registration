const express = require('express');

const router = express.Router();

const api = require('../functions/api');
const request = require('request-promise')

router.get('/', async (req, res) => {
	try {
		const cars = await api.getCars();
		console.log('cars:')
		console.log(cars);
		const data = {
			Cars: cars
		}
		console.log("data for render")
		console.log(data)
		res.render('home', data)
	} catch (err) {
		console.log(err);
		res.render('home');

	}

});
router.get('/test', (req, res) => {
	// getRequest('http://192.168.99.100:3005/car')
	// getRequest('http://192.168.99.100:8080/car')
	// getRequest('http://api:3005/car')
	getRequest('http://api:8080/car')
	res.send("done");
})

function getRequest(url) {
	console.log(`get request: ${url}`)
	try {
		request({
			"method": "GET",
			"uri": url,
			"json": true,
			"headers": {
				"Authorization": "test"
			}
		}).then(console.log, console.log);
	} catch (err) {
		console.log("error" + err)
	}
}
module.exports = router;