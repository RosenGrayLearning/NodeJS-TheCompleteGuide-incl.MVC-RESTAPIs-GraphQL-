const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use((req,res,next)=>{
    //GET
    res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Origin','*'); // * stands for wild card / or we can be more specific about our domains
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE'); //allowing to use the client(the origin) which methods are allowed
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});
app.use('/feed', feedRoutes);

app.listen(8080);