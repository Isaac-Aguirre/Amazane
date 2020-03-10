"use strict";

const router = require("express").Router();
const db = require("../models");
let cart = [];
let total = { val: 0 };

let currentCat = "all";

router.get("/apii/getCurrentCat", (req, res) => {
  res.json(currentCat);
});

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

router.get('/land', (req, res) => {
  res.render('index');
})

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

router.post('/updateCategory/:category', (req, res) => {
  currentCat = req.params.category;
  res.status(204).end();
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
  let newOrderNumber = orders.length + 1;

  for (let i = 0; i < cart.length; i++) {
    db.Order.create({
      orderNumber: newOrderNumber,
      userID: req.user.dataValues.id,
      itemID: cart[i].id,
      quantity: 1
    });
  }

  res.status(204).end();
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

router.get("/:query?", (req, res) => {
  db.Item.findAll({}).then(function(items) {
    let hbsObj = items.map(item => {
      return item.dataValues;
    });

    // if category is set, refine hbsObj
    if (currentCat != "all") {
      switch (currentCat) {
        case "shoes":
          hbsObj = hbsObj.filter(item => {
            return item.category == "shoes";
          });
          break;
        case "sweatshirts":
          hbsObj = hbsObj.filter(item => {
            return item.category == "sweatshirts";
          });
          break;
        case "bottoms":
          hbsObj = hbsObj.filter(item => {
            return item.category == "bottoms";
          });
          break;
        case "t-shirts":
          hbsObj = hbsObj.filter(item => {
            return item.category == "t-shirts";
          });
          break;
        case "accessories":
          hbsObj = hbsObj.filter(item => {
            return item.category == "accessories";
          });
          break;
      }
    }

    // render
    if (hbsObj.length) {
      if (req.params.query) {
        hbsObj = hbsObj.filter(item => {
          let words = item.name.split(" ");
          words = words.map(word => {
            return word.toLowerCase();
          });

          if (words.indexOf(req.params.query.toLowerCase()) != -1) {
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
