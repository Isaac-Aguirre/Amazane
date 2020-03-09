const router = require('express').Router();
const db = require('../models');
let cart = [];

router.get("/:name?", (req, res) => {
  db.Item.findAll({}).then(function(items) {
    let hbsObj = items.map(item => { return item.dataValues; });
    if (hbsObj.length) {
      if (req.params.name) {
        hbsObj = hbsObj.filter(item => {
          let words = item.name.split(' ');
          words = words.map( word => {  return word.toLowerCase() });
        
          if( words.indexOf(req.params.name.toLowerCase()) != -1 ) {
            return true;
          }
        });
        res.render("shop", { items: hbsObj, cart: cart });
      }
      else {
        res.render("shop", { items: hbsObj, cart: cart });
      }
    } else {
      res.render("shop", { cart: cart });
    }
  });
});

router.post('/cart', (req, res) => {
  cart.push(req.body);
  res.status(204).end();
});

router.delete('/cart/:id', (req,res) => {
  let ids = cart.map(item => item.id);
  let index = ids.indexOf(req.params.id);

  cart.splice(index,1);

  res.status(204).end();

})

router.get('/getCartCount', (req, res) => {
  res.send(cart.length);
});


router.get('/cart', (req, res) => {
  res.render('cart', { cart: cart });
});

module.exports = router;
