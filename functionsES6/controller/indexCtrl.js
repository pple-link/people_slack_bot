import { select, update } from '../db/query';
import axios from 'axios';

class Controller {
	async update(req, res, next) {
		const boardnum = req.params.boardnum;
		const flag = req.params.flag;

		const result = await select('*', 'board', `boardnum = ${boardnum}`);
		if (result.rows > 0) {
			const result = await update('show_flag', flag, 'board', `where boardnum = ${boardnum} returning *`);

			if (result.rowCount > 0) {
				const response = await axios.post(
					'https://hooks.slack.com/services/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',
					{ text: `${boardnum} 성공적으로 수정됨` }
				);
			}
		}
		res.json();
	}
}

module.exports = new Controller();
