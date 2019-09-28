const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'); 

//our routes that we have created - which also a middleware function that we can pass
const adminRoutes = require('./routes/admin'),
      shopRoutes = require('./routes/shop');

//app is a valid request handler, so we can pass it to our createServer
const app = express();

//registering a path to the public folder for serving static files
app.use(express.static(path.join(__dirname,'public')))

//adding our Middleware(req,res,next => {}) executes for every upcoming request
// app.use((req,res,next)=>{
//     console.log('in the middleware');
//     next();// calling to the next middleware in line
// });
// app.use((req,res,next)=>{
//     console.log('in another middleware');
//     //sending a response back res.send(any?html,json and son);
//     res.send('<h1>Hello from vladi </h1>');

// });

//passing our app as a request handler method, or not if we are using express, we can omit that
// const server = http.createServer(app);


//registering our parser
//if we have other bodies(like json and so on) - we can use different parsers
app.use(bodyParser.urlencoded({extended:false}));

// app.use('/',(req,res,next)=>{
//     //should be only triggered for request that goes to "/"
//     //adding another argument (which is the default ) : '/'
//      console.log('our first middle which is always displayed');
//     next();
// });

 /*  
  * this content has moved to admin.js router file
  * there, we are using these method within our route object
  *
      app.use('/add-product',(req,res,next)=>{
            const form = `<form action="/product" method="POST" >
            <input type="text" name="title">
            <button type="submit">Add Product</button>
            </form>`
            res.send(form);
        });
        let title = '';

        //instead of using app.use(), we can do app.get/post() and so on. to be triggered on spesific requests
        //app.get('/product',(req,res,next)=>{
        app.post('/product',(req,res,next)=>{
            title = req.body.title;
            res.redirect('/');
        
        });

  */

 /*  
  * this content has moved to shop.js router file
  * there, we are using these method within our route object
            app.use('/',(req,res,next)=>{
                res.send('<h1>Hello slash</h1>');
            });

  */

//passing our routes (which is also a middleware function) to our use :
//filtering our path by adding a prefix to it
 app.use('/admin',adminRoutes);
 app.use(shopRoutes);

 app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
 });

 //adding 404 error page


app.listen(3000);