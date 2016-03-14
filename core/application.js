'use strict';

/**
 * Module dependencies.
 */
var http = require("http");
var url = require("url");
var Router = require("./router");


/**
 * Application prototype.
 */
var app = Application.prototype;


/**
 * Initialize a new `Application`.
 *
 * @api public
 */
function Application(config) {
    this.config = config;
}


/**
 * Run Application.
 */
app.run = function(){
    let router = new Router(this.config);
    this.start(function (pathname, response, request) {
        router.route(pathname, response, request);
    });
}

/**
 * Server start.
 */
app.start = function (callback) {
    http.createServer(function(request, response){
        let pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        callback(pathname, response, request);
    }).listen(this.config.defaultPort);
    console.log("Server has started in "+this.config.defaultPort+" port.");
}


module.exports = Application;
