'use strict';

/**
 * Module dependencies.
 */
var Model = require("../core/model");

// Model inherit config.js
TestModel.prototype = new Model();


function TestModel (argument) {
    this.collection = 'documents';
}


TestModel.prototype.add = function (data, callback) {
    let collection = this.collection;
    this.connection(null, function (err, db) {
        if (err) {
            return console.error(err);
        }

        // Insert some documents
        // db.collection(collection).insertMany(data, function(err, rs) {
        //     callback(err, rs);
        //     db.close();
        // });
        db.collection(collection).insert(data || {}, function(err, rs) {
            callback(err, rs);
            db.close();
        });
    });
};

TestModel.prototype.get = function (data, callback) {
    let collection = this.collection;
    this.connection(null, function (err, db) {
        if (err) {
            return console.error(err);
        }
        
        // Get some documents
        // db.collection(collection).find(data || {}).toArray(function(err, rs) {
        //     callback(err, rs);
        //     db.close();
        // });
        db.collection(collection).findOne(data || {}, function(err, rs) {
            callback(err, rs);
            db.close();
        });
    });
};


module.exports = TestModel;
