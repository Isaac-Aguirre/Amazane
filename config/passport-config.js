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
          googleId: profile.id,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          email: profile.emails[0].value
        }).then((dbUser) => {
          done(null, dbUser.dataValues);
        });
      }
    })
  })
);

// Handles token login
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Handles token logout
passport.deserializeUser((id, done) => {
  db.User.findOne({
    where: {
      id: id
    }
  }).then( (dbUser) => {
    done(null, dbUser);
    });
});

module.exports = passport;

module.exports += {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('auth/login') // if not auth
  },

  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next()
    }
    res.redirect('/profile/');  // if auth    
  }

}


// profile.id
// profile.emails[0].value

// profile
// {
//   id: '103868078556702371337',
//   displayName: 'Paul Kwon',
//   name: { familyName: 'Kwon', givenName: 'Paul' },
//   emails: [ { value: 'hyukjunkwon91@gmail.com', verified: true } ],
//   photos: [
//     {
//       value: 'https://lh4.googleusercontent.com/-n476x3e_Bxk/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nBAW_a1UR0Vaxk8UIcmQhSnjx9chQ/photo.jpg'
//     }
//   ],
//   provider: 'google',
//   _raw: '{\n' +
//     '  "sub": "103868078556702371337",\n' +
//     '  "name": "Paul Kwon",\n' +
//     '  "given_name": "Paul",\n' +
//     '  "family_name": "Kwon",\n' +
//     '  "picture": "https://lh4.googleusercontent.com/-n476x3e_Bxk/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nBAW_a1UR0Vaxk8UIcmQhSnjx9chQ/photo.jpg",\n' +
//     '  "email": "hyukjunkwon91@gmail.com",\n' +
//     '  "email_verified": true,\n' +
//     '  "locale": "en"\n' +
//     '}',
//   _json: {
//     sub: '103868078556702371337',
//     name: 'Paul Kwon',
//     given_name: 'Paul',
//     family_name: 'Kwon',
//     picture: 'https://lh4.googleusercontent.com/-n476x3e_Bxk/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nBAW_a1UR0Vaxk8UIcmQhSnjx9chQ/photo.jpg',
//     email: 'hyukjunkwon91@gmail.com',
//     email_verified: true,
//     locale: 'en'
//   }
// }