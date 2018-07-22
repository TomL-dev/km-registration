require('dotenv').config();

const express = require('express');
const expresshandlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const carRouter = require('./routes/car');
const app = express();


app.use(express.static('public'));

app.engine('handlebars', expresshandlebars({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json());

app.use('/car', carRouter);


app.listen(8080, () => {
	console.log(`started frontend on port 8080`);
});