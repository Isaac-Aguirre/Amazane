const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const db = require('../models');

// Passport use takes 2 params:
// param1 : Strategy with options (clientID & clientSecret stored in keys.js)
// param2 : Passport cb
passport.use(
  new GoogleStrategy({
    // options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    // Callback function: done returns the profile data to serializeUser

    // Check if we already have the user registered
    db.User.findOne({
      where: {
        googleId: profile.id
      }
    }).then( (dbUser) => {
      // If a user is found
      if(dbUser) {
        done(null, dbUser.dataValues);
      }
      // If user does not exist, register the user
      else {
        db.User.create({
          googleId: profile.id
        }).then((dbUser) => {
          done(null, dbUser.dataValues);
        });
      }
    })
  })
);

// Handles token login
passport.serializeUser((user, done) => {
  console.log('serializeUser Fired, `user` variable:');
  console.log(user);
  done(null, user.id);
});

// Handles token logout
passport.deserializeUser((id, done) => {
  console.log('DEserializeUser Fired, `id` variable:');
  console.log(id);
  db.User.findOne({
    where: {
      id: id
    }
  }).then( (dbUser) => {
    done(null, dbUser);
    });
});

module.exports = passport;