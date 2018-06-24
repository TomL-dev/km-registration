function createResponse(res, status, message) {
	res.status(status).send(message);
}

function sendDatabaseError(res, err) {
	createResponse(res, 500, {
		"error": "error in database connection",
		"reason": err
	});
}

function sendInvalidParameter(res, message) {
	createResponse(res, 422, {
		"error": "invalid parameter",
		"reason": message
	});
}

function sendAuthorizationError(res, message) {
	createResponse(res, 401, {
		"error": "not authorized, please provide valid credentials",
		"reason": message
	});
}

function sendNoRouteAvailableError(res) {
	createResponse(res, 404, {
		'error': 'requested route was not found'
	});
}

function sendSuccessfullResponseMessage(res, message) {
	createResponse(res, 200, {
		data: message
	});
}

function sendSuccessfullResponseObject(res, object) {
	createResponse(res, 200, object);
}
module.exports.sendDatabaseError = sendDatabaseError;
module.exports.sendInvalidParameter = sendInvalidParameter;
module.exports.sendAuthorizationError = sendAuthorizationError;
module.exports.sendNoRouteAvailableError = sendNoRouteAvailableError;
module.exports.sendSuccessfullResponseMessage = sendSuccessfullResponseMessage;
module.exports.sendSuccessfullResponseObject = sendSuccessfullResponseObject;