var app = require('../server');
var express = require('express');
var CongressPerson = require('../models/congressPersonModel');

var router = express.Router();
var passport = require('passport');


router.get('/auth', function(req, res){
  res.send('You reached the AUTH route!');
});

<<<<<<< 6afbf610c0fb5a3df64738e1414cf5f1c13eb434
<<<<<<< 5102def2c970efc6ce4da7e1dffb0234d01c8409
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
=======
>>>>>>> Sets up infrastructure to connect sessions. Login.js recieves response from server.
=======
router.post('/login',
  passport.authenticate('local'),
  function(req,res) {
    res.redirect('/users/' + req.user.username);
  });
>>>>>>> Integrating Passport.js and frontEnd Authentication


/*
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
*/
module.exports = router;