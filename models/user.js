var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({
    facebookId  : String,
    token       : String,
    name        : String,
    groupsnames : String,
    picture     : String,
    email       : String,
    admin       : String
});
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
