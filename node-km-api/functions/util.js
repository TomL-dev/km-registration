const jwt = require('jsonwebtoken');
const response = require('./response');
const jwtKey = process.env.JWT_KEY;

function checkRequest(req, res, next) {
	if ('OPTIONS' === req.method) {
		res.status(200).send();
	} else {
		const includes = global.endpoints[req.method].includes(req.path);
		// console.log(`includes: ${includes}`);
		if (includes) {
			next();
		} else {
			response.sendNoRouteAvailableError(res)
		}
	}
}

function checkJWT_Token(req, res, next) {
	let token;
	// console.log('raw headers: ' + JSON.stringify(req.rawHeaders));
	// console.log('header: ' + JSON.stringify(req.headers));
	// console.log('body: ' + JSON.stringify(req.body));

	// console.log('headers: ' + JSON.stringify(req.headers));
	if (req.body && req.body.token) {
		console.log('getting token from body')
		token = req.body.token
	} else if (req.query.token) {
		console.log('getting token from query params')
		token = req.query.token;
	} else if (req.headers['x-access-token']) {
		console.log('getting token from x-access-token header')
		token = req.headers['x-access-token'];
	} else if (req.headers['authorization']) {
		console.log('getting token from auth header');
		token = req.headers['authorization']
	}
	console.log("token: " + token)
	if (!token) {
		console.log('sending no token provided err')

		// next(new Error('no token found'));
		response.sendAuthorizationError(res, "No Authorization Token Found");
		// res.status(403).send({
		// 	message: "not authorized. no token provided"
		// });
		// return;
	} else {

		//const verified = jwt.verify(token, process.env.passphrase.toString());
		//console.log('verified: ' + verified);
		jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
			if (err) {
				console.log('error in verify:' + err)
				// next(err);
				response.sendAuthorizationError(res, "No Valid Token");
				// res.status(403).send({
				// 	message: "could not verify token"
				// });
			} else {
				console.log('verified, NEXT()')
				req.decoded = decoded;
				next();
			}
		});
	}
}

function generateJWT_Token(isAdmin) {
	const payload = {
		authenticated: true,
		admin: isAdmin
	}
	const token = jwt.sign(payload, jwtKey, {
		expiresIn: '3600'
	});
	return token;
}

module.exports.checkJWT_Token = checkJWT_Token;
module.exports.checkRequest = checkRequest;
module.exports.generateJWT_Token = generateJWT_Token;