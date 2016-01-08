var app = require('../server');
var express = require('express');
var router = express.Router();

router.get('/auth', function(req, res){
  res.send('You reached the AUTH route!');
});

module.exports = router;