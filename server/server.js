var express = require('express');
var routes = require('./routes/routes');
var morgan = require('morgan');

var app = express();
var port = process.env.PORT || 4556;
app.use(express.static(__dirname + '/../client'));
app.listen(port);
app.use(morgan('dev'));

//to use routes defined in routes/routes
app.use('/api', routes);


console.log('Server now listening on port ' + port);

module.exports = app;