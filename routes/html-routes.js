"use strict";

const router = require("express").Router();
const db = require("../models");
let cart = [];
let total = { val: 0 };

router.get("/apii/getCartCount", (req, res) => {
  let count = cart.length + "";
  res.send(count);
});

// router.post('/apii/cart', (req, res) => {
//   cart.push(req.body);
//   console.log(cart);
//   res.status(204).end();
// });

// router.delete('/apii/cart/:id', (req,res) => {
//   let ids = cart.map(item => item.id);
//   let index = ids.indexOf(req.params.id);

//   cart.splice(index,1);

//   res.status(204).end();

// })

// router.get('/apii/cart', (req, res) => {
//   res.json(cart);
// })

router.get("/updateCart", async (req, res) => {
  let cartItems = req.query.cart;
  if (cartItems) {
    cart = [];
    total.val = 0;
    for (let i = 0; i < cartItems.length; i++) {
      await updateCartByItemIndex(cartItems[i], total, cart);
    }

    res.json(cart);
  } else {
    res.json(cart);
  }
});

router.get("/cart", (req, res) => {
  if (total.val === 0) {
    res.render("empty-cart");
  } else {
    res.render("cart", {
      cart: cart,
      total: total.val
    });
  }
});

function updateCartByItemIndex(itemIndex, total, cart) {
  return new Promise(function(resolve, reject) {
    db.Item.findOne({
      where: {
        id: itemIndex
      }
    })
      .then(dbItem => {
        cart.push(dbItem.dataValues);
        total.val += dbItem.dataValues.price;
        return resolve(dbItem.dataValues);
      })
      .catch(err => {
        if (err) return reject(err);
      });
  });
}

router.get("/order", async (req, res) => {
  let orders = await db.Order.findAll();

  let newOrderNumber = "1";

  for (let i = 0; i < cart.length; i++) {
    db.Order.create({
      orderNumber: newOrderNumber,
      userID: req.user.dataValues.id,
      itemID: cart[i].id,
      quantity: 1
    });
  }

  res.send(newOrderNumber);
});

router.get("/confirm-order/:orderNumber", (req, res) => {
  let cart_copy = Object.assign([], cart);
  let total_copy = total.val;
  total.val = 0;
  cart = [];
  res.render("confirm-order", {
    user: req.user.dataValues,
    cart: cart_copy,
    total: total_copy,
    orderNumber: req.params.orderNumber
  });
});

router.get("/:name?", (req, res) => {
  db.Item.findAll({}).then(function(items) {
    let hbsObj = items.map(item => {
      return item.dataValues;
    });
    if (hbsObj.length) {
      if (req.params.name) {
        hbsObj = hbsObj.filter(item => {
          let words = item.name.split(" ");
          words = words.map(word => {
            return word.toLowerCase();
          });

          if (words.indexOf(req.params.name.toLowerCase()) != -1) {
            return true;
          }
        });
        res.render("shop", { items: hbsObj });
      } else {
        res.render("shop", { items: hbsObj });
      }
    } else {
      res.render("shop", {});
    }
  });
});

module.exports = router;
