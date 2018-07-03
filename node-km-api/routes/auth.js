const express = require('express');
const router = express.Router();
const utils = require('../functions/util');
const response = require('../functions/response');
const mongoClient = require('mongodb').MongoClient;

// build connection here
// original: 'mongodb://mongouser:mongopassword@192.168.99.100:27017'

const mongoUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`; // process.env.MONGO_CONNECTION;
console.log('created mongo connectionurl: ' + mongoUrl);
const mongoDatabaseName = process.env.MONGO_DATABASE;
const mongoCollectionName = process.env.MONGO_COLLECTION;

router.post('/', (req, res) => {
	// validate user at database
	// generate token

	const username = req.body.username;
	const password = req.body.password;

	mongoClient.connect(mongoUrl, (err, client) => {
		if (err) {
			console.log("Error in mongo connection: " + err);
			response.sendDatabaseError(res, err);
		} else {
			const db = client.db(mongoDatabaseName);
			const collection = db.collection(mongoCollectionName);
			collection.findOne({
				'name': username
			}, (err, foundUser) => {
				if (err) {
					console.log("Error in finding user by name: " + err);
					response.sendDatabaseError(res, err);
				} else {
					if (foundUser) {
						console.log('user found');
						if (password === foundUser.password) {
							console.log('passwords match');
							const isAdmin = false;
							const token = utils.generateJWT_Token(isAdmin);
							response.sendSuccessfullResponseMessage(res, token);
						} else {
							console.log("Passwords do not match for user: " + username)
							response.sendAuthorizationError(res, "Incorrect credentials")
						}
					} else {
						console.log("Not found User: " + username)
						response.sendAuthorizationError(res, "Incorrect credentials")
					}
				}
			});
		}
	})

});

module.exports = router;