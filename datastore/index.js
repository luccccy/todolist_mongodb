const fs = require('fs');
const path = require('path');
const _ = require('underscore');
//const counter = require('./counter');
const db = require('./dbconnection');
const Promise = require('promise');
const ObjectId = require('mongodb').ObjectId;

var items = {};

exports.create = (text, callback) => {
  //console.log(text);
  db.then((db) => {
    return db.collection('testData').insertOne({text: text});
  })
    .then((data) => {
      //console.log(data);
      callback(null, {id: data.insertedId.toString(), text});
    })
    .catch(err => {
      callback(new Error('Post todo item failed'));
    });
};


exports.readAll = (callback) => {
  db.then((db) => {
    return db.collection('testData').find().toArray();
  })
    .then((data) => {
      return _.map(data, (item) => {
        return {id: item._id.toString(), text: item.text};
      });
      //console.log(todos);
      //return todos;
    })
    .then(data => {
      console.log(data);
      callback(null, data);
    })
    .catch(err => {
      callback(new Error('No items in the database!'));
    });
};


exports.readOne = (id, callback) => {
  db.then((db) => {
    return db.collection('testData').findOne({_id: new ObjectId(`${id}`)});
  })
    .then((data) => {
      callback(null, {id: data._id.toString(), text: data.text});
    })
    .catch(err => {
      callback(new Error(`No item with id: ${id}`));
    });
};



exports.update = (id, text, callback) => {
  db.then((db) => {
    return db.collection('testData').updateOne({_id: new ObjectId(`${id}`)}, {$set: {'text': text}});
  })
    .then(() => {
      callback(null, { id, text });
    })
    .catch(err => {
      callback(new Error('Update failed!'));
    });

};

exports.delete = (id, callback) => {
  db.then((db) => {
    return db.collection('testData').remove({_id: new ObjectId(`${id}`)});
  })
    .then((data) => {
      if (!data.acknowledged) {
        callback(new Error(`No item with id: ${id}`));
      }
      callback();
    });
};



// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {

};