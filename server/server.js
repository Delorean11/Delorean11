var express = require('express');
var routes = require('./routes/routes');

var app = express();
var port = process.env.PORT || 4556;

app.listen(port);
app.use('/*', routes);

console.log('Server now listening on port ' + port);

module.exports = app;