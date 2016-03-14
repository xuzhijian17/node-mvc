'use strict';

/**
 * Module dependencies.
 */
var fs = require("fs");
var ejs = require("ejs");


// Define view path.
const VIEWPATH = __dirname + "/../views/";


/**
 * View render.
 */
exports.render = function (view, data, response, request) {
    let viewTemplate = VIEWPATH + view + '.ejs';
    
    fs.readFile(viewTemplate, "UTF-8", function (err, str) {
        if (err) {
            response.writeHead(404, {"Content-Type": "text/html"});
            response.write("404 Not found");
            response.end();
            return console.error(err);
        }

        let ret = ejs.render(str, data);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(ret);
        response.end();
    });
}
