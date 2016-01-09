var senateSeed = require('./senateSeed');
var houseSeed = require('./houseSeed');
var CongressPerson = require('./congressPersonModel');

exports.seedSenate = function(){
  for(var i = 0; i < senateSeed.length; i++){
    var nextPerson = senateSeed[i];
    var person = new CongressPerson;
    var fullName = nextPerson.first_name + ' ' + nextPerson.last_name;
    person.name = fullName.toLowerCase();
    person.id = nextPerson.id;
    person.state = nextPerson.state;
    person.website = nextPerson.url;
    person.party = nextPerson.party;
    person.nextElection = nextPerson.next_election;
    person.facebook = nextPerson.facebook_account;
    person.twitter = nextPerson.twitter_account;
    person.totalVotes = nextPerson.total_votes;
    person.missedVotes = nextPerson.missed_votes;
    person.missedVotesPerc = nextPerson.missed_votes_pct;
    person.votesWithParty = nextPerson.votes_with_party_pct;
    person.chamber = 'senate';
    person.seniority = nextPerson.seniority;
    person.save();
    console.log('senate member');
  }
};

exports.seedHouse = function(){
  for(var i = 0; i < houseSeed.length; i++){
    var nextPerson = houseSeed[i];
    var person = new CongressPerson;
    var fullName = nextPerson.first_name + ' ' + nextPerson.last_name;
    person.name = fullName.toLowerCase();
    person.id = nextPerson.id;
    person.state = nextPerson.state;
    person.website = nextPerson.url;
    person.party = nextPerson.party;
    person.nextElection = nextPerson.next_election;
    person.facebook = nextPerson.facebook_account;
    person.twitter = nextPerson.twitter_account;
    person.totalVotes = nextPerson.total_votes;
    person.missedVotes = nextPerson.missed_votes;
    person.missedVotesPerc = nextPerson.missed_votes_pct;
    person.votesWithParty = nextPerson.votes_with_party_pct;
    person.chamber = 'house';
    person.seniority = nextPerson.seniority;
    person.save();
    console.log('house member');
  }
};