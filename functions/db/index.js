'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Singleton = undefined;

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = void 0;

var Singleton = exports.Singleton = function Singleton() {
	_classCallCheck(this, Singleton);

	if (instance) return instance;
	var functionConfig = function functionConfig() {
		if (process.env.RUN_LOCALLY) {
			return JSON.parse(_fs2.default.readFileSync('.env.json'));
		} else {
			return functions.config();
		}
	};
	instance = new _pg2.default.Pool({
		host: functionConfig().env['db_host'],
		user: functionConfig().env['db_user'],
		password: functionConfig().env['db_pw'],
		database: functionConfig().env['database'],
		port: functionConfig().env['db_port']
	});
	return instance;
};