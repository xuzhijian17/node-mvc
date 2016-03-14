exports.config = function() {
    return {
        "defaultPort" : 7071,
        "defaultController" : "IndexController",
        "defaultAction" : "indexAction",
        "directoryStructure" : {
            "modelDirName" : "models",    //定义模型目录名称
            "controllerDirName" : "controllers",    //定义控制器目录名称
            "viewDirName" : "views",    //定义视图目录名称
            "layoutDirName" : "layout"
        },
        "mongodb" : {
            "url" : "mongodb://localhost:27017/test",
            "host" : "localhost",
            "database" : "test",
            "port" : 27017,
            "auto_reconnect" : true
        }
    };
}

/*function Config () {
    return {
        "defaultController" : "IndexController",
        "defaultAction" : "indexAction",
        "directoryStructure" : {
            "modelDirName" : "models",    //定义模型目录名称
            "controllerDirName" : "controllers",    //定义控制器目录名称
            "viewDirName" : "views",    //定义视图目录名称
            "layoutDirName" : "layout"
        },
        "mongodb" : {
            "url" : "mongodb://localhost:27017/test",
            "host" : "localhost",
            "database" : "test",
            "username" : "root",
            "password" : "",
            "port" : 27017,
            "auto_reconnect" : true
        }
    };
}

module.exports = Config;*/
