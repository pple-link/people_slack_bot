'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.deaes = exports.aes = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _firebaseFunctions = require('firebase-functions');

var funtions = _interopRequireWildcard(_firebaseFunctions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var functionConfig = function functionConfig() {
	if (process.env.RUN_LOCALLY) {
		var fs = require('fs');
		return JSON.parse(fs.readFileSync('.env.json'));
	} else {
		return functions.config();
	}
};
var aes = exports.aes = function aes(input) {
	var cipher = _crypto2.default.createCipher('aes-256-cbc', process.env.CRYPTO_SECRETKEY);
	var c_input = cipher.update(input, 'utf8', 'base64');
	c_input += cipher.final('base64');
	return c_input;
};

var deaes = exports.deaes = function deaes(input) {
	var decipher = _crypto2.default.createDecipher('aes-256-cbc', functionConfig().env['CRYPTO_SECRETKEY']);
	var d_input = decipher.update(input, 'base64', 'utf8');
	d_input += decipher.final('utf8');
	return d_input;
};