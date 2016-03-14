'use strict';

/**
 * Module dependencies.
 */
var fs = require("fs");

// Define controller path.
const CONTROLLERPATH = __dirname + "/../controllers/";


/**
 * Initialize.
 */
function Router(config) {
    this.config = config;
}

/**
* Route resolution
*/
Router.prototype.route = function (pathname, response, request) {
    let routeName, controllerName, actionName;

    // 匹配根路径
    let re_root = /^\/?$/gi;
    // 匹配控制器/动作路径
    let re_uri = /\/(\w+)\/(\w+)/gi;

    // 路由匹配
    if (re_root.test(pathname)) {
        // 设置默认路由所解析的控制器及方法
        controllerName = this.config.defaultController;   // 默认控制器名
        actionName = this.config.defaultAction;   // 默认动作/方法名
    }else if (routeName = re_uri.exec(pathname)) {
        // 解析路由
        //var controller = res[1].replace(/(\w)/,function(v){return v.toUpperCase()});  // 自动将控制器名首字母大写，这样在uri中输入路径就可以忽略大小写
        controllerName = routeName[1]+"Controller";   // 匹配uri中的控制器名
        actionName = routeName[2]+"Action";   // 匹配uri中的动作/方法名
    }else {
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("404 Not found");
        response.end();
        return console.error("No request handler found for " + pathname);
    }

    this.distribute(controllerName, actionName, response, request);
}

/**
* The controller to distribute
*/
Router.prototype.distribute = function (controllerName, actionName, response, request) {
    let controllerPath = CONTROLLERPATH + controllerName+".js";
    
    fs.stat(controllerPath, function (err, stats) {
        // 文件是否存在
        if(err){
            return console.error(err);
        }

        // 是否为文件
        if(stats.isFile()){
            let cController = require(controllerPath);
            let oController = new cController();

            if (typeof oController[actionName] == "function") {
                if (oController.filter(actionName, response, request)) {
                    oController[actionName](response, request);
                }else{
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write("Filter function is return false.");
                    response.end();
                }
            }else {
                response.writeHead(404, {"Content-Type": "text/html"});
                response.write("404 Not found");
                response.end();
                return console.error("Controller path is return " + oController[actionName]);
            }
        }
    });
}

module.exports = Router;
