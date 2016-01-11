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

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.use(session({ secret: 'nyan cat' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./auth/passport.js')(passport); //pass passport for configuration

/*app.use(function (req, res, next) {

  console.log('super hello');

    res.setHeader('Access-Control-Allow-Origin', process.env.PORT || 'http://localhost:' + 4556);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();

});*/

//app.use(flash()); // use connect-flash for flash messages stored in session

// app.configure(function() {
  // app.use(express.static('public'));
  // app.use(express.cookieParser());
  // app.use(express.bodyParser());
  // app.use(express.session({ secret: 'keyboard cat' }));
  // app.use(passport.initialize());
  // app.use(passport.session());
//   app.use(app.router);
// });

//require('/routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// For authentication page go to localhost:****/api/auth
// Angular routes are localhost:****/#/auth
app.use('/api', routes);
console.log('Server now listening on port ' + port);
app.listen(port);




//Connect to db
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/congressionalStalker'); //Test local db
// mongoose.connect("mongodb://delorean11:delorean11@ds039175.mongolab.com:39175/congressional-stalker");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {

  // seedConstructors.seedHouse();
  // seedConstructors.seedSenate();

console.log('congressionalStalker db opened');
});


module.exports = app;

