const express = require('express'),
//requering the path module
path = require('path'); 

const rootDir = require('../util/path');

//setting up our Router which is connected to our app
// it also has methods similar (like get,post etc..) which we can use
const router = express.Router();

// router.get('/add-product',(req,res,next)=>{
//     const form = `<form action="/admin/product" method="POST" >
//     <input type="text" name="title">
//     <button type="submit">Add Product</button>
//     </form>`
//     res.send(form);
// });

router.get('/add-product',(req,res,next)=>{
    // res.sendFile(path.join(__dirname,'../','views','add-product.html'));
    res.sendFile(path.join(rootDir,'views','add-product.html'));

});

//instead of using app.use(), we can do app.get/post() and so on. to be triggered on spesific requests
//app.get('/product',(req,res,next)=>{
router.post('/add-product',(req,res,next)=>{
    console.log(req.body)
    // console.log('hello' + req.body.title);
    res.redirect('/');
 
});


module.exports = router;
