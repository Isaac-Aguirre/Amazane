const router = require('express').Router();
const db = require('../models');

router.post('/apii/cart', (req, res) => {
  cart.push(req.body);
  console.log(cart);
  res.status(204).end();
});

router.delete('/apii/cart/:id', (req,res) => {
  let ids = cart.map(item => item.id);
  let index = ids.indexOf(req.params.id);

  cart.splice(index,1);

  res.status(204).end();

})

router.get('/getCartCount', (req, res) => {
  res.send(cart.length);
});

router.get('/apii/cart', (req, res) => {
  res.json(cart);
})

router.get('/cart', (req, res) => {
  console.log(req.body)
  let cartItems = req.body;
  let cart = []
  for(let i = 0; i < cartItems.length; i++){
    db.Item.findOne({ where:{ id : req.body.id } }).then( (dbItem) => {
      cart.push(dbItem.dataValues);
    });
  }
  res.render('cart', { cart: cart });
});

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
        res.render("shop", { items: hbsObj});
      }
      else {
        res.render("shop", { items: hbsObj });
      }
    } else {
      res.render("shop", {  });
    }
  });
});

module.exports = router;
