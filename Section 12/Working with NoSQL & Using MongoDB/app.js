const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');



const app = express();


// app.use(session({
//   secret : 'my secret' , //hash that secretly store our id in the cookie 
//   resave : false,
//   saveUninitialized : false
//   //cookie : {} //optional
// }));


// app.use((req,res,next)=>{
//  req.session.name = 'vladi';
//   res.send('<h1>Hello</h1>')
// })

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5d40632a845c868991568d62')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);



mongoConnect(() => {
  app.listen(3000);
});
