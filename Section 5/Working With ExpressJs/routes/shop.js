const express = require('express'),
//requering the path module
      path = require('path'); 
const rootDir = require('../util/path');


const router = express.Router();

router.get('/',(req,res,next)=>{
    // res.send('<h1>Hello slash</h1>');

    //sending file (in our example - html)
    res.sendFile(path.join(rootDir,'views','shop.html'));
});


module.exports = router;