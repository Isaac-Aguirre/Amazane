const router = require('express').Router();
const db = require('../models');

router.get('/', (req, res) => {
  db.Item.findAll({}).then(function(items) {
    const hbsObj = items.map(item => { return item.dataValues });
    if(hbsObj.length) {
      res.render('shop', {items: hbsObj});
    }
    else {
      res.render('shop');
    }
  });
});

router.get('/cart', (req, res) => {
  res.render('cart');
});

module.exports = router;
