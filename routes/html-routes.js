const router = require('express').Router();
const db = require('../models');

router.get('/', (req, res) => {
  db.Item.findAll({}).then(function(items) {
    console.log(items);
    res.render('shop', items);
  });
});

router.get('/team', (req, res) => {
  res.render('team');
});

router.get('/carts', (req, res) => {
  res.render('carts');
});

module.exports = router;
