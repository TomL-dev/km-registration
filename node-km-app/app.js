require('dotenv').config();
const express = require('require');
const expresshandlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.engine('handlebars', expresshandlebars({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json())

