'use strict';

/**
 * Initialize.
 */
function Controller () {
}

/**
 * Filter hook(like before action function).
 */
Controller.prototype.filter = function(action, response, request){
	return true;
}

module.exports = Controller;
