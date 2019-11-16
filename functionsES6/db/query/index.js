import { Singleton } from '../index';

export const select = async (object, table, where, add = '', add2 = '', ps = '') => {
	try {
		const instance = new Singleton();
		const result = await instance.query(`SELECT ${object} FROM ${table} ${add} WHERE ${where} ${add2}`, ps);
		return result;
	} catch (err) {
		const arr = [
			'에러가 발생하였습니다. slack bot',
			err.stack,
			`SELECT ${object} FROM ${table} ${add} WHERE ${where} ${add2}`,
		];
		console.log(err);
		err.message = arr.join('\n');
		throw new Error(err);
	}
};
export const update = async (object, ToBEObject, table, where = '', ps = '') => {
	try {
		const instance = new Singleton();
		const result = await instance.query(`UPDATE ${table} SET ${object} = ${ToBEObject} ${where}`, ps);

		return result;
	} catch (err) {
		const arr = [
			'에러가 발생하였습니다. update query',
			err.stack,
			`UPDATE ${table} SET ${object} = ${ToBEObject} ${where}`,
		];
		err.message = arr.join('\n');
		throw new Error(err);
	}
};
