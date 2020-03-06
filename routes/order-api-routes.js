var db = require('./models');

module.exports = (app) =>{

    app.get("/api/orders", (req,res) => {
        db.Order.findAll({}).then ((dbOrder) => {
            res.json(dbORder);
        });
    });

    app.get("/api/orders/user/:user", (req,res) =>{
        db.Order.findAll({
            where:{
                userID: req.params.user
            }
        }).then((dbOrder) => {
            res.json(dbOrder);
        });
    });

    app.get("/api/orders/orderNum/:orderNum", (req,res) =>{
        db.Order.findAll({
            where:{
                orderNum: req.params.orderNum
            }
        }).then((dbOrder) => {
            res.json(dbOrder);
        });
    });

    app.post("/api/orders", (req,res) => {
        db.Order.create(req.body).then((dbOrder) => {
            console.log(dbOrder);
            res.json(dbOrder);
        });
    });

    
}