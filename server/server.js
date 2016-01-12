var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

var User = require('./models/userModel');
var CongressPerson = require('./models/congressPersonModel');
var seedConstructors = require('./models/seedConstructors');

// Dependencies needed for Authentication
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/routes');


var app = express();
var port = process.env.PORT || 4556;
app.use(express.static(__dirname + '/../client'));



app.use(morgan('dev'));

app.use(cookieParser());
app.use(bodyParser());

app.use(session({ secret: 'nyan cat' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./auth/passport.js')(passport); //pass passport for configuration

// For authentication page go to localhost:****/api/auth
// Angular routes are localhost:****/#/auth
app.use('/api', routes);
console.log('Server now listening on port ' + port);
app.listen(port);




//Connect to db - test for existence of local db
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/congressionalStalker');

// mongoose.connect("mongodb://delorean11:delorean11@ds039175.mongolab.com:39175/congressional-stalker");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {

/* The seedConstructors function is called to seed the database
with the congress and senate member bio and id info. This is done so
that the API call to get the member bio info does not need to be done
on each search, which speeds up performance. Only the API call to get
their voting history will be performed on each search.

You will need to uncomment these two lines the first time you are running the
server on your database, and then comment them back when your database has been
seeded. */

  // seedConstructors.seedHouse();
  // seedConstructors.seedSenate();

  console.log('congressionalStalker db opened');
});


module.exports = app;

