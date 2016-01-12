var app = require('../server');
var express = require('express');
var CongressPerson = require('../models/congressPersonModel');
var scraperjs = require('scraperjs');

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
  CongressPerson.findOne({name: req.params.name}, function(err, person){
    if(person === null) {
      res.send(404, "person not found");
    } else {
    //Scrape the bio first
      scraperjs.StaticScraper.create('http://bioguide.congress.gov/scripts/biodisplay.pl?index='+person.id)
        .scrape(function($) {
          return $("body").map(function() {
            return $(this).text();
          }).get();
        })
        .then(function(bio) {
          console.log(bio);
          res.send({member: person, memberBio: bio});
        })
        .catch(function() {
          res.send({member: person});
        });
    }

  });
});

router.get('/byState/:state', function(req, res) {
  CongressPerson.find({state: req.params.state}, function(err, people){
    if (err) console.log(err);
    res.send(people);
  });
});

router.post('/login',
  passport.authenticate('local'),
  function(req,res) {
    //searchCache holds the user's previous searches
    res.send({_id: req.user._id, searchCache: req.user.searchCache});
  }
);

router.get('/logout', function(req,res) {
    req.logout();
    res.end();
  }
);

router.post('/register',
  function(req,res) {
    User.findOne({email: req.body.email}, function(err, user) {
      if (err) console.log(err);
      if (!user) {
        //save username and password to database
        User.create({password: req.body.password, email: req.body.email, searchCache: []}, function(err, user){
          if (err) console.log(err);
          //redirect to loggedin version of search page
          res.send({_id: user._id, searchCache: user.searchCache});
        });
      } else {
        res.send('This account already exists');
      }
    });
  }
);


router.post('/user/cacheSearch', function(req, res){
  User.findOne({_id: req.body._id}, function(err, user){
    var currCache = user.searchCache;
    var duplicate = false;
    console.log(req.body.search);
    for(var i = 0; i < currCache.length; i++){
      if(currCache[i].id === req.body.search.id) duplicate = true;
    }
    if(!duplicate){
      currCache = [req.body.search].concat(currCache);
      if(currCache.length > 10){
        currCache.pop();
      }
      user.searchCache = currCache;
      user.save();
    }
    // console.log(currCache, ' the currCache');
    res.send(currCache);
  });
});

module.exports = router;