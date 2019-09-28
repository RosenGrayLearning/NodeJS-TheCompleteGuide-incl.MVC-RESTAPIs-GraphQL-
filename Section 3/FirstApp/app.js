const fs = require('fs');

function plus(num){
    return num + 2;
}

var res = plus(7);
console.log(res);
//node app.js 
// 9

fs.writeFileSync('hello.txt','hello from the other side');