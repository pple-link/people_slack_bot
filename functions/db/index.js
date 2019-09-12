'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Singleton = undefined;

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = void 0;

var Singleton = exports.Singleton = function Singleton() {
  _classCallCheck(this, Singleton);

  if (instance) return instance;

  instance = new _pg2.default.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
  });
  return instance;
};