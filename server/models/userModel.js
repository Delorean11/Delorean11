var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
<<<<<<< 6afbf610c0fb5a3df64738e1414cf5f1c13eb434
  email: {type: String, required: true, unique: true},
=======
  username: {type: String, required: true},
>>>>>>> Integrating Passport.js and frontEnd Authentication
  password: {type: String, required: true}
});

var User = mongoose.model('User', userSchema);

module.exports = User;