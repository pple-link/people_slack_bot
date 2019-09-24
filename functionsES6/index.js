import * as functions from 'firebase-functions';

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
import admin from 'firebase-admin';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import route from './route';
import router from './router';
admin.initializeApp();
const app = express();

const functionConfig = () => {
	if (process.env.RUN_LOCALLY) {
		const fs = require('fs');
		return JSON.parse(fs.readFileSync('.env.json'));
	} else {
		return functions.config();
	}
};

console.log(functionConfig());
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
dotenv.config({
	path: path.join(__dirname, `/.env'}`),
});

console.log(process.env.DB_PORT);

// Add middleware to authenticate requests
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

// Expose Express API as a single Cloud Function:
exports.webHook = functions.region('asia-northeast1').https.onRequest(app);
