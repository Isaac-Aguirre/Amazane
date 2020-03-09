const router = require("express").Router();
const fs = require("fs");
const db = require("../models");

// When /api/pushInventory is GET,
// Drop existing Item table and push items in 'assets/inventory.json'
router.get("/pushInventory", async (req, res) => {
  try {
    const inventory = await JSON.parse(
      fs.readFileSync("assets/inventory.json", "utf-8")
    );

    for (let i = 0; i < inventory.length; i++) {
      db.Item.create({
        name: inventory[i].name,
        category: inventory[i].category,
        quantity: Math.floor(Math.random() * 10) + 1,
        price: inventory[i].price,
        picture: inventory[i]["img-link"]
      });
    }

    res.status(204).end();
  } catch (err) {
    if (err) res.send(err);
  }
});

router.get("/items/", (req, res) => {
  db.Item.findAll({}).then(dbItem => {
    res.json(dbItem);
  });
});

router.get("/items/id/:id", (req, res) => {
  db.Item.findOne({
    where: {
      id: req.params.id
    }
  }).then(dbItem => {
    res.json(dbItem);
  });
});

router.get("/items/name/:name", (req, res) => {
  db.Item.findOne({
    where: {
      name: req.params.name
    }
  }).then(dbItem => {
    res.json(dbItem);
  });
});

router.get("/items/category/:category", (req, res) => {
  db.Item.findAll({
    where: {
      category: req.params.category
    }
  }).then(dbItem => {
    res.json(dbItem);
  });
});

router.post("/items", (req, res) => {
  db.Item.create(req.body).then(dbItem => {
    console.log(dbItem);
    res.json(dbItem);
  });
});

router.delete("/items/:id", (req, res) => {
  db.Item.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbItem => {
    res.json(dbItem);
  });
});

router.put("/items/:id", (req, res) => {
  db.Item.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(dbItem => {
    res.json(dbItem);
  });
});

// ORDERS

router.get("/orders", (req, res) => {
  db.Order.findAll({}).then(dbOrder => {
    res.json(dbORder);
  });
});

router.get("/orders/user/:user", (req, res) => {
  db.Order.findAll({
    where: {
      userID: req.params.user
    }
  }).then(dbOrder => {
    res.json(dbOrder);
  });
});

router.get("/orders/orderNum/:orderNum", (req, res) => {
  db.Order.findAll({
    where: {
      orderNum: req.params.orderNum
    }
  }).then(dbOrder => {
    res.json(dbOrder);
  });
});

router.post("/orders", (req, res) => {
  db.Order.create(req.body).then(dbOrder => {
    console.log(dbOrder);
    res.json(dbOrder);
  });
});

// USERS

router.get("/users/:username", (req, res) => {
  db.User.findOne({ where: { username: req.params.username } }).then(dbUser => {
    res.json(dbUser);
  });
});

router.delete("/users/:username", (req, res) => {
  db.User.destroy({
    where: {
      username: req.params.username
    }
  }).then(dbUser => {
    res.json(dbUser);
  });
});

router.post("/users", (req, res) => {
  db.User.create(req.body).then(dbUser => {
    console.log(dbUser);
    res.json(dbUser);
  });
});

router.put("/users/:id", (req, res) => {
  db.User.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(dbUser => {
    console.log('user registered successfully, dbUser:');
    console.log(dbUser);
    res.render('profile', { user: dbUser.dataValues });
  });
});

module.exports = router;
