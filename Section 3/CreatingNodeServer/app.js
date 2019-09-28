const http = require('http');

//creating a server
//const server = http.createServer((req,res)=>{
    /*
     * Reqeust getting the request url, method and headers
     */
    // const url = req.url,
    //       method = req.method,
    //       headers = req.headers;

    /*
     * Respond sending the headers, html template and ending the process
     */
         
    // res.setHeader('Content-Type','text/html');
    // res.write('<h1>');
    // res.write(Hello dolly);
    // res.write(</h1>);
    // res.end();

    //process.exit();//quiting our server
//});

const server = http.createServer((req,res)=>{
    const url = req.url;
    switch(url){
        case '/':
                res.setHeader('Content-Type','text/html');
                res.write('<h1>');
                res.write('this is the url path:'+url);
                res.write('</h1>');
                res.write('<a href="/form">click here for the form url</a>');
                res.end();
        break;
        case '/form':
                res.setHeader('Content-Type','text/html');
                res.write('<h1>');
                res.write('this is the form path:'+url);
                res.write('</h1>');
                res.end();
        break;
        default:
                res.setHeader('Content-Type','text/html');
                res.write('<h1>');
                res.write('nothing to see here');
                res.write('</h1>');
                res.end();
    }

    //setting the response status code - res.statusCode = 302 
    //redirecting the user - res.setHeader('Location','/')
});
server.listen(3000);