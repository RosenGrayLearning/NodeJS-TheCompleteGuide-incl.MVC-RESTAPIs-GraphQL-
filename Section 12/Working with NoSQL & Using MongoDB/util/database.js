const mongodb= require('mongodb'),
      MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) =>{
   MongoClient.connect('mongodb+srv://vlad:test@cluster0-srnxn.mongodb.net/shop?retryWrites=true&w=majority',{ useNewUrlParser: true })
        .then(client => {
          console.log('Connected!!!!')
          _db = client.db();
          callback();
        })
        .catch(err=>{
                console.log(err)
                console.log(' Not Connected - There is An ERROR!!!!')
        });
}



const getDb = () =>{
  if(_db){
     return _db;
   }     
   throw 'No Database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
