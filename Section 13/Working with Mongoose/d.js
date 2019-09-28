const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const errorController = require('./controllers/error');

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
  User.findById('5d45884450a1890b03c6f2a8')
    .then(user => {
      req.user =  user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://vlad:test@cluster0-srnxn.mongodb.net/shop?retryWrites=true&w=majority', { useNewUrlParser: true } )
        .then(result=>{
          User.findOne().then(user=>{
            if(!user){
              const user = new User({
                name:'Vladi',
                email:'vlad@gmail.com',
                cart: []
              });
              user.save(); 
            }
          });
          app.listen(3000);
        })
        .catch(err=>{
          console.log(err)
        });


