const router = require('express').Router();
const db = require('../models');

router.get('/', (req, res) => {
  db.Item.findAll({}).then(function(items) {
    const hbsObj = items.map(item => { return item.dataValues });
    console.log(hbsObj);
    if(hbsObj.length) {
      console.log('if fired')
      res.render('shop', {items: hbsObj});
    }
    else {
      console.log('else fired')
      res.render('shop');
    }
  });
});

router.get('/team', (req, res) => {
  res.render('team');
});

router.get('/carts', (req, res) => {
  res.render('carts');
});

module.exports = router;
