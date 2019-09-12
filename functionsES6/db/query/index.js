import { Singleton } from '../index';

export const select = async (object, table, where, add = '', add2 = '') => {
	try {
		const instance = new Singleton();
		const result = await instance.query(`SELECT ${object} FROM ${table} ${add} WHERE ${where} ${add2}`);
		return result;
	} catch (err) {
		console.log(err);
	}
};

export const update = async (object, ToBEObject, table, where = '') => {
	const instance = new Singleton();
	const result = await instance.query(`UPDATE ${table} SET ${object} = ${ToBEObject} ${where}`);
	return result;
};
