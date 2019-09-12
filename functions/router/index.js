'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _indexCtrl = require('../controller/indexCtrl');

var _indexCtrl2 = _interopRequireDefault(_indexCtrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/:boardnum/edit/:flag', _indexCtrl2.default.update);

exports.default = router;