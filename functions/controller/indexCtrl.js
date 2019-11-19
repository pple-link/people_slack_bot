'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _query = require('../db/query');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

var _crypto = require('../util/crypto');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
	function Controller() {
		_classCallCheck(this, Controller);
	}

	_createClass(Controller, [{
		key: 'update',
		value: async function update(req, res) {
			try {
				var functionConfig = function functionConfig() {
					return functions.config();
				};
				if (req.body.token != functionConfig().env['token']) {
					throw new Error('허가되지 않은 토큰');
				}
				var param = req.body.text.split(' ');
				var boardnum = param[0];
				var flag = param[1];
				var show = '';

				if (flag == '1') {
					show = '노출';
				} else if (flag == '0') {
					show = '비노출';
				} else if (flag == '3') {
					show = '모집완료';
				} else {
					show = '대기중';
				}
				console.log(req.params.boardnum, req.params.flag);
				var result = await (0, _query.select)('*', 'board', 'boardnum = ' + boardnum);
				if (result.rows.length > 0) {
					var _result = await (0, _query.update)('show_flag', '\'' + flag + '\'::show_flag_t', 'board', 'where boardnum = ' + boardnum + ' returning *');
					console.log(_result);

					if (_result.rowCount > 0) {
						var response = await _axios2.default.post('https://hooks.slack.com/services/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', { text: boardnum + ' \uAE00 \uBC88\uD638\uAC00 ' + show + ' \uAE00\uC0C1\uD0DC\uB85C \uC218\uC815\uB428' });
					} else {
						console.log('row count 0');
					}
				}
				res.json({
					respons_type: 'in_channel',
					text: '\uC131\uACF5\uC801\uC73C\uB85C ' + boardnum + ' \uAC8C\uC2DC\uAE00\uC774 ' + show + ' \uC0C1\uD0DC\uB85C \uC218\uC815\uB418\uC5C8\uC2B5\uB2C8\uB2E4.'
				});
			} catch (err) {
				console.log(err);
				res.json({ status: 'error', err: err });
			}
		}
	}, {
		key: 'find',
		value: async function find(req, res) {
			try {
				var functionConfig = function functionConfig() {
					return functions.config();
				};
				if (req.body.token != functionConfig().env['token']) {
					throw new Error('허가되지 않은 토큰');
				}
				var data = req.body.text.split(' ');
				var boardnum = void 0,
				    nickname = void 0,
				    query = void 0;
				if (data.length == 2) {
					nickname = data[1];
					query = 'nickname=' + nickname;
				} else {
					boardnum = data[0];
					query = 'usernum = (select author from board where boardnum = \'' + boardnum + '\')';
				}

				// select nickname from member where id = (selecgt author from board where boardnum = $boardnum)
				var result = await (0, _query.select)('nickname, phone, email', 'member', query);
				nickname = (0, _crypto.deaes)(result.rows[0].nickname);
				var phone = (0, _crypto.deaes)(result.rows[0].phone);
				var email = (0, _crypto.deaes)(result.rows[0].email);

				var response = await _axios2.default.post('https://hooks.slack.com/services/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', { text: '\uB2C9\uB124\uC784 : ' + nickname + ' \n phone: ' + phone + ' \n email : ' + email });

				res.json({
					respons_type: 'in_channel',
					text: '\uB2C9\uB124\uC784 : ' + nickname + ' \n phone: ' + phone + ' \n email : ' + email
				});
			} catch (err) {
				console.log(err);
				res.json({ status: 'error', err: err });
			}
		}
	}]);

	return Controller;
}();

module.exports = new Controller();