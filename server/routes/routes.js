var app = require('../server');
var express = require('express');
var CongressPerson = require('../models/congressPersonModel');

var router = express.Router();
var passport = require('passport');

router.get('/auth', function(req, res){
  res.send('You reached the AUTH route!');
});

<<<<<<< da6b65da15399aedeebcb807f01d2fbfe066f0dd
router.get('/allMembers', function(req, res){
  CongressPerson.find({}, function(err, people){
    res.send(people);
  });
});

router.get('/getOneMember/:name', function(req, res){
  console.log(req.params)
  CongressPerson.findOne({last_name: req.params.name}, function(err, person){
    res.send(person);
  });
});

router.get('/byState/:state', function(req, res){
  CongressPerson.find({state: req.params.state}, function(err, people){
    res.send(people);
  });
=======
router.get('/login', function(req,res){
  console.log(passport);
>>>>>>> In middle of making server.js connect to passport
});

module.exports = router;