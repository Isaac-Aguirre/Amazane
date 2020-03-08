const router = require('express').Router();
const db = require('../models');

const checkAuth = (req, res, next) => {
  // If a user is not yet registered
  if(!req.user.dataValues.isRegistered) {
    res.redirect('/auth/register/' + req.user.dataValues.id);
  }
  else {
    next();
  }
};

router.get('/', checkAuth, (req, res) => {
  res.render('profile', { user: req.User});
});

module.exports = router;


// checkAuth fired, `req.user` variable: 
// User {
//   dataValues: {
//     id: 1,
//     accountType: null,
//     googleId: '103868078556702371337',
//     username: null,
//     password: null,
//     email: null,
//     address: null,
//     city: null,
//     isRegistered: false,
//     createdAt: 2020-03-07T22:13:01.000Z,
//     updatedAt: 2020-03-07T22:13:01.000Z
//   },