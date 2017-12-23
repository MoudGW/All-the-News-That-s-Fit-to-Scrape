// Required NPM Packages
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

var app = express();

// Public Settings
app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 8080;
var MONGODB_URI = "mongodb://heroku_ndw69814:3r17d4io8ctr0bm4vsp89cos3c@ds161426.mlab.com:61426/heroku_ndw69814";
// Database
mongoose.connect(MONGODB_URI, function(err) {
	if(err) throw err;
	console.log('database connected');
});


// BodyParser Settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
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

//Port
app.listen(port, function() {
    console.log("Listening on port:" + port);
});