'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.update = exports.select = undefined;

var _index = require('../index');

var select = exports.select = async function select(object, table, where) {
	var add = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
	var add2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
	var ps = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';

	try {
		var instance = new _index.Singleton();
		var result = await instance.query('SELECT ' + object + ' FROM ' + table + ' ' + add + ' WHERE ' + where + ' ' + add2, ps);
		return result;
	} catch (err) {
		var arr = ['에러가 발생하였습니다. slack bot', err.stack, 'SELECT ' + object + ' FROM ' + table + ' ' + add + ' WHERE ' + where + ' ' + add2];
		console.log(err);
		err.message = arr.join('\n');
		throw new Error(err);
	}
};
var update = exports.update = async function update(object, ToBEObject, table) {
	var where = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
	var ps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

	try {
		var instance = new _index.Singleton();
		var result = await instance.query('UPDATE ' + table + ' SET ' + object + ' = ' + ToBEObject + ' ' + where, ps);

		return result;
	} catch (err) {
		var arr = ['에러가 발생하였습니다. update query', err.stack, 'UPDATE ' + table + ' SET ' + object + ' = ' + ToBEObject + ' ' + where];
		err.message = arr.join('\n');
		throw new Error(err);
	}
};