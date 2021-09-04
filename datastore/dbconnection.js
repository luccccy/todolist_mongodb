var Promise = require('promise');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/todolist';

const client = new MongoClient(url, {useUnifiedTopology: true});

// client.connect().then((client) => {
//   var db = client.db('todolist');
//   // db.collection('testData').find().toArray(function(err, result) {
//   //   if (err) {
//   //     throw err;
//   //   }
//   //   console.log(result);
//   // });
//   return db;
// });

var db = new Promise((resolve, reject) => {
  client.connect().then((err) => {
    var database = client.db('todolist');
    if (database) {
      resolve(database);
    } else {
      reject(err);
      return;
    }
  });
});
// .then ((db) => {
//   db.collection('testData').insert({test: "hahahahah"});
// });

// mongoClient.connect(url, (err, db) => {
//   if (err) {
//     console.log(err);
//   }
//   var dbase = db.db('todolist');
//   dbase.listCollections().toArray(function(err, items) {
//     if (err) {
//       throw err;
//     }
//     console.log(items);
//     if (items.length === 0) {
//       dbase.createCollection('testData');
//     }
//   });
// });


module.exports = db;

//module.exports = client;
//module.exports = mongoClient;
