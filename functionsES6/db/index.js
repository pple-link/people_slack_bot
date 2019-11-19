import * as functions from 'firebase-functions';
import pg from 'pg';
import fs from 'fs';
let instance;
export class Singleton {
	constructor() {
		if (instance) return instance;
		const functionConfig = () => {
			return functions.config();
		};

		instance = new pg.Pool({
			host: functionConfig().env['db_host'],
			user: functionConfig().env['db_user'],
			password: functionConfig().env['db_pw'],
			database: functionConfig().env['database'],
			port: functionConfig().env['db_port'],
		});
		return instance;
	}
}
