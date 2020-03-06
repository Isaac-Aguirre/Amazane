const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
  res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {

  //
  // handle with passport
  //

  res.send('logging out');
});

// auth with Google
// passport.authenticate gets two params:
// param1: strategy 'google'
// param2: options (set scope)
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile/');
}); 

module.exports = router;