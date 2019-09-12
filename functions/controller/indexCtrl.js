'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _query = require('../db/query');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
	function Controller() {
		_classCallCheck(this, Controller);
	}

	_createClass(Controller, [{
		key: 'update',
		value: async function update(req, res, next) {
			var boardnum = req.params.boardnum;
			var flag = req.params.flag;

			var result = await (0, _query.select)('*', 'board', 'boardnum = ' + boardnum);
			if (result.rows > 0) {
				var _result = await (0, _query.update)('show_flag', flag, 'board', 'where boardnum = ' + boardnum + ' returning *');

				if (_result.rowCount > 0) {
					var response = await _axios2.default.post('https://hooks.slack.com/services/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', { text: boardnum + ' \uC131\uACF5\uC801\uC73C\uB85C \uC218\uC815\uB428' });
				}
			}
			res.json();
		}
	}]);

	return Controller;
}();

module.exports = new Controller();