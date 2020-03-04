var db = require("../models/");

module.exports = (app) => {

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
        sku: = req.body.sku
      }
    }).then((dbItem) => {
      res.json(dbItem);
    });
  });


};
