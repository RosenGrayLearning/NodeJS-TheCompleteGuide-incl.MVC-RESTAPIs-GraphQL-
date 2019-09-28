const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb://localhost:27017/shop";



//mongodb+srv://vlad:test@cluster0-srnxn.mongodb.net/shop
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions"
});

const csrfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", "views");


const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(flash());


app.use(csrfProtection);
app.use((req, res, next) => {

  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken()
  next();
});


const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if(!user){
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use('/500',errorController.get500);
app.use(errorController.get404);

//Error Handling Middlware
//It always being executed (skipping all other middlewares) when we pass error to next(error);
//If we got more then one error-handling middleware, they'll execute from to to bottom
app.use((error,req,res,next) => {
  res.redirect('/500');
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });