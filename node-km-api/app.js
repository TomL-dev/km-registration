// imports packages
// require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const logger = require('morgan');
const listEndpoints = require('express-list-endpoints');

// import from project
const car = require('./routes/car');
const km = require('./routes/km');
const auth = require('./routes/auth');
const utils = require('./functions/util');
const checkDatabase = require('./functions/checkDatabase');

// initialize express
const app = express();

// set logger
app.use(logger('dev'));

// set global variable
global.endpoints = {
	GET: [],
	POST: []
};

// middleware
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// check if request is an options request, if true, send 200 OK
// check if request is to an valid endpoint, if false, send 404 Not Found
// else call next()
app.use((req, res, next) => {
	utils.checkRequest(req, res, next);
});

// set open routes
app.get('/', (req, res) => {
	res.send({
		status: 200,
		message: 'hello'
	});
});
// set auth router
app.use('/auth', auth);

// add security
app.use((req, res, next) => {
	utils.checkJWT_Token(req, res, next);
});

// set secure routes
app.use('/car', car);
app.use('/km', km);

// error handler
app.use((err, req, res) => {
	console.log('error handling: ' + err)
	// set locals, only providing error in development
	const status = err.status || 500
	// const message = err.message;
	res.status(status).send({
		"message": "no route available"
	})
	// res.send(err.status || 500);
});

// create list of all endpoints
listEndpoints(app).forEach((endpoint) => {
	const method = endpoint.methods;
	const route = endpoint.path;
	global.endpoints[method].push(route);
});

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`started on port ${port}`);

	// checking database
	checkDatabase.checkDatabaseOnStartup();
});