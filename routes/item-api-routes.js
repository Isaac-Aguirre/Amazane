var db = require("../models/");

module.exports = (app) => {

  // When /api/pushInventory is GET,
  // Drop existing Item table and push items in 'assets/inventory.json'
  app.get("/api/pushInventory", async (req, res) => {
    try {
      const inventory = await JSON.parse(fs.readFileSync('assets/inventory.js', "utf-8"));
    
      for(let i = 0; i < inventory.length; i++) {
        db.Item.create({
          name: inventory[i].name,
          category: inventory[i].category,
          quantity: Math.floor(Math.random() * 10) + 1,
          price: inventory[i].price,
          picture: inventory[i]['img-link']
        });
      }
      
      res.status(204).end();
    }
    catch(err) {
      if(err) res.send(err);
    }
  });

  app.get("/api/items/all", (req,res) =>{
    db.Item.findAll({}).then((dbItem) => {
      res.json(dbItem);
    });
  });

  app.get("/api/items/:sku", (req,res)=>{
    db.Item.findOne({
      where:{
        sku: req.params.sku
      }
    }).then( (dbItem) => {
      res.json(dbItem);
    });
  });

  app.get("/api/items/:name", (req,res)=>{
    db.Item.findOne({
      where:{
        sku: req.params.name
      }
    }).then( (dbItem) => {
      res.json(dbItem);
    });
  });

  app.get("/api/items/:category", (req,res)=>{
    db.Item.findAll({
      where:{
        sku: req.params.category
      }
    }).then( (dbItem) => {
      res.json(dbItem);
    });
  });

  app.post("/api/items", (req,res) => {
    db.Item.create(req.body).then((dbItem) => {
      console.log(dbItem);
      res.json(dbItem);
    });
  });

  app.delete("/api/items/:sku", (req,res) => {
    db.Item.destroy({
      where:{
        sku: req.params.sku
      }
    }).then((dbItem) => {
      res.json(dbItem)
    });
  });

  app.put("/api/items", (req,res) => {
    db.Item.update(req.body,{
      where:{
        sku:  req.body.sku
      }
    }).then((dbItem) => {
      res.json(dbItem);
    });
  });


};
