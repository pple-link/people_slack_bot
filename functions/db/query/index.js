'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.update = exports.select = undefined;

var _index = require('../index');

var select = exports.select = async function select(object, table, where) {
	var add = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
	var add2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

	try {
		var instance = new _index.Singleton();
		var result = await instance.query('SELECT ' + object + ' FROM ' + table + ' ' + add + ' WHERE ' + where + ' ' + add2);
		return result;
	} catch (err) {
		console.log(err);
	}
};

var update = exports.update = async function update(object, ToBEObject, table) {
	var where = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

	var instance = new _index.Singleton();
	var result = await instance.query('UPDATE ' + table + ' SET ' + object + ' = ' + ToBEObject + ' ' + where);
	return result;
};