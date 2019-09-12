'use strict';

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

_firebaseAdmin2.default.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

var app = (0, _express2.default)();

// Automatically allow cross-origin requests
app.use((0, _cors2.default)({ origin: true }));
_dotenv2.default.config({
	path: _path2.default.join(__dirname, '/.env\'}')
});

// Add middleware to authenticate requests
app.use(_express2.default.json());
app.use(_bodyParser2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));

app.use(_route2.default.edit, _router2.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next((0, _httpErrors2.default)(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});
// Expose Express API as a single Cloud Function:
exports.webHook = functions.region('asia-northeast1').https.onRequest(app);