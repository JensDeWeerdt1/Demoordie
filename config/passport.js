// load all the things we need
var FacebookStrategy   = require('passport-facebook').Strategy;
var User = require('../models/user');
var Group = require('../models/group');

module.exports = function(passport) {
    // used to serialize the user for the session (bij login)
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  // used to deserialize the user (bij logout)
  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });
    
    passport.use(new FacebookStrategy({
    clientID: "362089030859415",
    clientSecret: "a0ea6fb3d03d7db5368cd33bd8ace04d",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ["id", "name", "photos", "email"]
  },
  function(accessToken, refreshToken, profile, done) {
        User.findOne({ 'facebookId' : profile.id }, function(err, user) {//gebruikt user model in combo met mongoose, zoekt dacebookid dat gelijk is aan profielid
                
              if (err)
                  return done(err);
                
              if (user) {
                  return done(null, user);
              } else {
                  var newUser            = new User();
                  
                  newUser.facebookId    = profile.id;
                  newUser.token         = accessToken;
                  newUser.name          = profile.name.givenName + ' ' + profile.name.familyName;
                  newUser.groupsnames   = 'Webtech';
                  newUser.picture       = profile.photos ? profile.photos[0].value : '/img/faces/unknown-user-pic.jpg',
                  newUser.email         = profile.emails[0].value,//Je kan meerdere emails hebben daarom eerste email
                  newUser.admin         = '0'
                  newUser.save(function(err) {
                      if (err)
                          throw err;
                      console.log('data saved to mongo');
                      return done(null, newUser);
                  });
              }

          });
  }
));
}

