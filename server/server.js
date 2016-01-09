var express = require('express');
var routes = require('./routes/routes');
var morgan = require('morgan');
var mongoose = require('mongoose');
var keys = require('./secrets/keys.js');
var User = require('./models/userModel');
var CongressPerson = require('./models/congressPersonModel');
var seedConstructors = require('./models/seedConstructors');

var app = express();
var port = process.env.PORT || 4556;
app.use(express.static(__dirname + '/../client'));
app.listen(port);
app.use(morgan('dev'));

app.use('/api', routes);

console.log('Server now listening on port ' + port);

//Connect to db
mongoose.connect(keys.mongoLabURI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('congressionalStalker db opened');
  // CongressPerson.remove({}, function(){});
  // seedConstructors.seedSenate();
  // seedConstructors.seedHouse();
});


module.exports = app;