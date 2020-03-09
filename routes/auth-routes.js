const router = require('express').Router();
const passport = require('passport');

// auth logout
router.get('/logout', (req, res) => {

  req.logout();
  res.redirect('/')

  //
  // handle with passport
  //

  res.send('logging out');
});

router.get('/register' ,(req, res) => {
  res.render('register', { userId: 0 });
});

// Register route from Google Login
router.get('/register/:id', (req, res) => {
  res.render('register', { userId: req.params.id });
});

// auth with Google
// passport.authenticate gets two params:
// param1: strategy 'google'
// param2: options (set scope)
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile/');
}); 

module.exports = router;