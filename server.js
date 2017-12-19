var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var MongoClient = require('mongodb').MongoClient
var port = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the 'public' directory
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// define the view engine is handlebars
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Import routes 
var routes = require('./controllers/burgers_controller.js');

app.use('/', routes);

app.listen(port);

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = process.env.MONGODB_URI || "mongodb://localhost/mynews";

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});
