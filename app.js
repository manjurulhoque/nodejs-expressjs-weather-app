const yargs = require('yargs');
var express = require('express');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('view engine', 'ejs');

// Routes

var routes = require('./routes');

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//home
app.get('/', routes.home);

app.post('/', routes.home);

app.get('*', routes.not_found);

app.listen(3000, function(){
	console.log('Application is running on 3000');
});
