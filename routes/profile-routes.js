const router = require('express').Router();
const db = require('../models');


const checkAuth = (req, res, next) => {
  console.log("req.user from checkAuth");
  console.log(req.user);
  // If a user is not yet registered
  if(!req.user.dataValues.isRegistered) {
    res.render('register', { user: req.user.dataValues });
  }
  else {
    next();
  }
};

router.get('/', checkAuth, (req, res) => {
  console.log("req.user from router");
  console.log(req.user);
  res.render('profile', { user: req.user.dataValues });
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