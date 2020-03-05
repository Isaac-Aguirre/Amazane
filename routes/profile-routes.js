const router = require('express').Router();

const checkAuth = (req, res, next) => {
  if(!req.user) {
    res.redirect('/auth/login');
  }
  else {
    next();
  }
};

router.get('/', checkAuth, (req, res) => {
  res.send('you are logged in as ' + req.user);
});

module.exports = router;