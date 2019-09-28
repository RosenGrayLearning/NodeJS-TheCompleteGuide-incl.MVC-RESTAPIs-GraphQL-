const http = require('http'),
      express = require('express');

//app is a valid request handler, so we can pass it to our createServer
const app = express();

//adding our Middleware(req,res,next => {}) executes for every upcoming request
app.use((req,res,next)=>{
    console.log('in the middleware');
});

//passing our app as a request handler method
const server = http.createServer(app);



server.listen(3000);