var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var congressPersonSchema = new Schema({
  name: String,
  id: String,
  state: String,
  district: String,
  website: String,
  party: String,
  nextElection: Number,
  facebook: String,
  twitter: String,
  totalVotes: Number,
  missedVotes: Number,
  missedVotesPerc: Number, 
  votesWithParty: Number,
  chamber: String,
  seniority: Number
});

var CongressPerson = mongoose.model('CongressPerson', congressPersonSchema);
module.exports = CongressPerson;