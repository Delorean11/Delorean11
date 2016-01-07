var app = require('../server');
var express = require('express');
var router = express.Router();

// router.get('/', function(req, res) {
//   res.send('/index.html');
// });

router.get('/auth', function(req, res){
  // console.log("<<<<" + req.body.url);
  res.send('You reached the AUTH route!');
})

module.exports = router;