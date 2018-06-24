const express = require('express');
const router = express.Router();
const utils = require('../functions/util');
const response = require('../functions/response');
const mongoClient = require('mongodb').MongoClient;


const mongoUrl = process.env.MONGO_CONNECTION;
const mongoDatabaseName = process.env.MONGO_DATABASE;
const mongoCollectionName = process.env.MONGO_COLLECTION;

router.post('/', (req, res) => {
	// validate user at database
	// generate token

	const username = req.body.username;
	const password = req.body.password;

	mongoClient.connect(mongoUrl, (err, client) => {
		if (err) {
			response.sendDatabaseError(res, err);
		} else {
			const db = client.db(mongoDatabaseName);
			const collection = db.collection(mongoCollectionName);
			collection.findOne({
				'name': username
			}, (err, foundUser) => {
				if (err) {
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
							response.sendAuthorizationError(res, "Incorrect credentials")
						}
					} else {
						response.sendAuthorizationError(res, "Incorrect credentials")
					}
				}
			});
		}
	})

});

module.exports = router;