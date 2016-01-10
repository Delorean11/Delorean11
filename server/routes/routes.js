var app = require('../server');
var express = require('express');
var CongressPerson = require('../models/congressPersonModel');

var router = express.Router();
var passport = require('passport');
var User = require('../models/userModel');

router.get('/auth', function(req, res){
  res.send('You reached the AUTH route!');
});

router.get('/allMembers', function(req, res){
  CongressPerson.find({}, function(err, people){
    res.send(people);
  });
});

router.get('/getOneMember/:name', function(req, res){
  console.log(req.params);
  CongressPerson.findOne({last_name: req.params.name}, function(err, person){
    res.send(person);
  });
});

router.get('/byState/:state', function(req, res) {
  CongressPerson.find({state: req.params.state}, function(err, people){
    res.send(people);
  });
});

/*router.get('/login', function(req,res){
  console.log(res);
  console.log(req);
});*/

router.post('/login',
  passport.authenticate('local'),
  function(req,res) {
    res.redirect('/users/' + req.user.email);
    // res.send('hi from the auth route');
  }
);

router.post('/register',
  //send post data to database
  //save username and password to database
  function(req,res) {
    User.findOne({email: req.body.email}, function(err, user) {
      if (err) console.log(err);
      if (!user) {
        User.create({password: req.body.password, email: req.body.email}, function(err, user){
          if (err) console.log(err);
          //redirect to loggedin version of search page
          res.send('You signed up successfully.');
          //this is where we would put favorite politicians
        });
      } else {
        res.send('This account already exists');
      }
    });
  }
);

/*
function isLoggedIn(req, res,
next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return nex
();

    // if they aren't redirect them to the home page
    res.redirect(');
}
*/
module.exports = router;