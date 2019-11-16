import * as functions from 'firebase-functions';
import pg from 'pg';
import fs from 'fs';
let instance;
export class Singleton {
	constructor() {
		if (instance) return instance;
		const functionConfig = () => {
			if (process.env.RUN_LOCALLY) {
				const fs = require('fs');
				return JSON.parse(fs.readFileSync('.env.json'));
			} else {
				return functions.config();
			}
		};

		instance = new pg.Pool({
			host: functionConfig().env['DB_HOST'],
			user: functionConfig().env['DB_USER'],
			password: functionConfig().env['DB_PW'],
			database: functionConfig().env['DATABASE'],
			port: functionConfig().env['DB_PORT'],
		});
		return instance;
	}
}
