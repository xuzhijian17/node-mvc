'use strict';

const DEBUG = 1;

/**
 * Module dependencies.
 */
var Application = require(__dirname + "/../core/application");

/**
 * Config.
 */
var cof = require(__dirname + "/../config/config");

/**
 * Run Application.
 */
var app = new Application(cof.config());
app.run();
