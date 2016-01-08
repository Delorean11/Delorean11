var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  userName: {type: String, required: true},
  password: {type: String, required: true}
});

var User = mongoose.model('User', userSchema);
module.exports = User;