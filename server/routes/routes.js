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
      })

    
  });
});

/*router.get('/byState/:state', function(req, res) {
  CongressPerson.find({state: req.params.state}, function(err, people){
    res.send(people);
  });
});*/

router.get('/byState/:state', function(req, res) {
  console.log(req.params.state);
  CongressPerson.find({state: req.params.state}, function(err, people){
    if (err) console.log(err);
    console.log(people);
    res.send(people);
  });
});

router.post('/login',
  passport.authenticate('local'),
  function(req,res) {
    res.send({_id: req.user._id, searchCache: req.user.searchCache});
  }
);

router.get('/logout', function(req,res) {
    req.logout();
    res.end();
  }
);

router.post('/register',
  //send post data to database
  //save username and password to database
  function(req,res) {
    User.findOne({email: req.body.email}, function(err, user) {
      if (err) console.log(err);
      if (!user) {
        User.create({password: req.body.password, email: req.body.email, searchCache: []}, function(err, user){
          if (err) console.log(err);
          //redirect to loggedin version of search page
          res.send({_id: user._id, searchCache: user.searchCache});
          //this is where we would put favorite politicians
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
    console.log(currCache, ' the currCache');
    res.send(currCache);
  });
})
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