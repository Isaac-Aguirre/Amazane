// Dependencies
const express = require('express');
const passportConfig = require('./config/passport-config');
const db = require('./models');
const passport = require('passport');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const handlebars = require('express-handlebars');
const path = require('path');

// Sets up the Express App
// =============================================================
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Cookie-session
// takes an object as a parameter:
// { 
//   maxAge: int in ms
//   keys: [ encryptedKey string ]
// }
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieEncryptKey]
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Global variables
app.use(function (req,res, next) {
  res.locals.login = req.isAuthenticated();
  if(req.user){
    res.locals.globalUsername = req.user.dataValues.nickname;
  }
  next();
  });

// Routes
app.use(express.static(path.join(__dirname,"public")));
app.use('/auth', require('./routes/auth-routes'));
app.use('/profile', require('./routes/profile-routes'));
app.use('/api', require('./routes/api-routes'));
app.use('/', require('./routes/html-routes.js'));


// Syncing our sequelize models and then starting our Express app
// =============================================================
const PORT = process.env.PORT || 3000;
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
