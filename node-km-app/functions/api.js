// const api_base = `${process.env.API_HOST}:${process.env.API_PORT}`;
const api_base = process.env.API_HOST //:8080`;
const url_car = "http://" + api_base + ":8080/car"
console.log(`url cars: ${url_car}`)
console.log(api_base);
console.log(url_car)
const request = require('request-promise')

// function getCars() {
// 	const AuthStr = 'test';
// 	return new Promise((resolve, reject) => {

// 		try {
// 			let result = getRequest(url_car, AuthStr);
// 			console.log('result:')
// 			console.log(result);
// 			resolve(result);
// 		} catch (err) {
// 			reject(err)
// 		}
// 	});
// }
function getCars() {
	return new Promise((resolve, reject) => {
		try {
			getRequestPromise(url_car, 'test').then(result => {
				console.log('res: ');
				console.log(result)
				resolve(result.data);
			})
		} catch (err) {
			reject(err);
		}
	})
}

function getRequestPromise(url, token) {
	console.log(`get request: ${url}`)
	return request({
		"method": "GET",
		"uri": url,
		"json": true,
		"headers": {
			"Authorization": token
		}
	})
	// 	.then(result => {
	// 		console.log('request result:');
	// 		console.log(result);
	// 		console.log("request result data");
	// 		console.log(result.data)
	// 		return result;
	// 	});
	// } catch (err) {
	// 	console.log("error" + err)
	// 	throw err
	// }
}

function getRequest(url, token) {
	console.log(`get request: ${url}`)
	try {
		request({
			"method": "GET",
			"uri": url,
			"json": true,
			"headers": {
				"Authorization": token
			}
		}).then(result => {
			console.log('request result:');
			console.log(result);
			console.log("request result data");
			console.log(result.data)
			return result;
		});
	} catch (err) {
		console.log("error" + err)
		throw err
	}
}

module.exports.getCars = getCars;