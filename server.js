// Required NPM Packages
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

var app = express();

// Public Settings
app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 3000;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mynews";
// Database
mongoose.connect(MONGODB_URI, function(err) {
	if(err) throw err;
	console.log('database connected');
});


// BodyParser Settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// Set up Handlebar for views
var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Routes
var routes = require('./routes/routes.js');
app.use('/',routes);

//404 Error
app.use(function(req, res) {
	res.render('404');
});

//Port
app.listen(port, function() {
    console.log("Listening on port:" + port);
});