var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  searchCache: [Schema.Types.Mixed]
});

userSchema.methods.validPassword = function(password) {
  return (this.password === password);
};

var User = mongoose.model('User', userSchema);

module.exports = User;