var express = require('express');
var routes = require('./routes/routes');
var morgan = require('morgan');
var mongoose = require('mongoose');
// var keys = require('./secrets/keys.js');
var User = require('./models/userModel');
var CongressPerson = require('./models/congressPersonModel');
var seedConstructors = require('./models/seedConstructors');

// Dependencies needed for Authentication
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
//


var app = express();
var port = process.env.PORT || 4556;
app.use(express.static(__dirname + '/../client'));
app.listen(port);
app.use(morgan('dev'));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

console.log('Server now listening on port ' + port);
app.use('/api', routes);
//Connect to db
mongoose.connect('mongodb://localhost/congressionalStalker'); //Test local db
//mongoose.connect("mongodb://delorean11:delorean11@ds039175.mongolab.com:39175/congressional-stalker");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  //Test data for users. Note: model was 'User', mongo re-names it as 'users' i.e. collection is always plural
/*  db.collection('users').insert({email: 'jkl@email.com', password: 'jkl'}, function(err,res) {
    if(err) {
      console.log(err);
    } else {
      console.log("inserted");
    }
  });*/

/* db.collection('congresspeople').insert(houseSeed, function(err,res) {
    if(err) {
      console.log(err);
    } else {
      console.log("inserted");
    }
  });*/
  console.log('congressionalStalker db opened');
});

module.exports = app;

