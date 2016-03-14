'use strict';

/**
 * Module dependencies.
 */
var mongo = require('mongodb'), Server = mongo.Server, Db = mongo.Db;
var cof = require("../config/config");


function Model (argument) {
    this.config = cof.config();
}

Model.prototype.connection = function(url, callback){
    mongo.MongoClient.connect(url || this.config.mongodb.url, function(err, db) {
        if (err) {
            return console.error(err);
        };
        console.log("Connected correctly to server");

        callback(err, db);
    });
};

module.exports = Model;
