var db = require("../models/");

module.exports = (app) => {
  app.get("api/users/:username", (req, res) => {
    db.User.findOne({where:{username: req.params.username}}).then( (dbUser) => {
      res.json(dbUser);
    });
  });

  app.delete("/api/users/:username", (req,res) => {
    db.User.destroy({
      where:{
        username: req.params.username
      };
    }).then( (dbUser) => {
      res.json(dbUser)
    });
  });

  app.post("/api/users", (req,res) => {
    db.User.create(req.body).then( (dbUser) => {
      console.log(dbUser);
      res.json(dbUser);
    });
  });

app.put("/api/users", (req,res) => {
  db.User.update(req.body,{
    where:{
      username: req.body.username
    }
  }).then( (dbUser) => {
    res.json(dbItem);
  });
});
}
