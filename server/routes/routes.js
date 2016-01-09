var app = require('../server');
var express = require('express');
var CongressPerson = require('../models/congressPersonModel');

var router = express.Router();

router.get('/auth', function(req, res){
  res.send('You reached the AUTH route!');
});

router.get('/allMembers', function(req, res){
  CongressPerson.find({}, function(err, people){
    res.send(people);
  });
});

router.get('/getOneMember/:name', function(req, res){
  CongressPerson.findOne({name: req.params.name}, function(err, person){
    res.send(person);
  });
});

router.get('/byState/:state', function(req, res){
  CongressPerson.find({state: req.params.state}, function(err, people){
    res.send(people);
  });
});

module.exports = router;