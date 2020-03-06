const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('shop');
});

router.get('/team', (req, res) => {
  res.render('team');
});

router.get('/carts', (req, res) => {
  res.render('carts');
});

module.exports = router;
