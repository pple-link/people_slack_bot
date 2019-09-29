'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var EDIT_FLAG = '/edit/:boardnum/:flag';
var SLACK_EDIT_FLAG = '/edit';

var routes = {
	// update: (id, flag) => {
	// 	if (id) {
	// 		console.log(id);
	// 		return `/edit/${id}/${flag}`;
	// 	} else {
	// 		return EDIT_FLAG;
	// 	}
	// },
	update: SLACK_EDIT_FLAG
};

exports.default = routes;