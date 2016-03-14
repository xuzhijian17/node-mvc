'use strict';

/**
 * Module dependencies.
 */
//var util = require("util");
var querystring = require('querystring');
var Controller = require("../core/controller");
var TestModel = require("../models/TestModel");
var View = require("../core/view");



// inherit ../core/Controller
IndexController.prototype = new Controller();


/**
 * Initialize.
 */
function IndexController (argument) {
}

/**
 * Index action(default action).
 */
IndexController.prototype.indexAction = function (response, request) {
    View.render('index/index', {title : "测试", add : "添加", get : "查看"}, response, request);
};


IndexController.prototype.addAction = function (response, request) {
    let post = '';     //定义了一个post变量，用于暂存请求体的信息，格式为'id=1&name=xxx&age=12'，需使用querystring.parse解析为一个js对象来使用

    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    request.on('data', function(chunk){
        post += chunk;
    });

    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    request.on('end', function(){
        let data = querystring.parse(post);     // 使用querystring.parse去解析post请求参数（格式参考上面post变量中的注释），返回js对象。
        let testModel = new TestModel();
        testModel.add(data, function (err, rs) {
			if (err) {
                return console.error(err);
            }
			
            console.log(require('util').inspect(rs, { depth: null }));
			response.end(JSON.stringify(rs));   //返回的rs为一个js对象，得用JSON.stringify去解析js对象，返回json对象。
        });
    });
};

IndexController.prototype.getAction = function (response, request) {
    let post = '';     //定义了一个post变量，用于暂存请求体的信息，格式为'id=1&name=xxx&age=12'，需使用querystring.parse解析为一个js对象来使用

    request.on('data', function(chunk){
        post += chunk;
    });

    request.on('end', function(){
        response.writeHead(200, { 'Content-Type': 'application/json' });

        let data = querystring.parse(post);     // 使用querystring.parse去解析post请求参数（格式参考上面post变量中的注释），返回js对象。
        let testModel = new TestModel();
        testModel.get(data, function (err, rs) {
            if (err) {
                return console.error(err);
            }
			
            console.log(require('util').inspect(rs, { depth: null }));
            response.end(JSON.stringify(rs));   //返回的rs为一个js对象，得用JSON.stringify去解析js对象，返回json对象。
        });
    });
};

module.exports = IndexController;
