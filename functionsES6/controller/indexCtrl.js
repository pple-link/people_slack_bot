import { select, update } from '../db/query';
import axios from 'axios';
import * as functions from 'firebase-functions';

class Controller {
	async update(req, res) {
		try {
			const functionConfig = () => functions.config();
			if (req.body.token != functionConfig().env['token']) {
				throw new Error('허가되지 않은 토큰');
			}
			const param = req.body.text.split(' ');
			const boardnum = param[0];
			const flag = param[1];
			let show = '';

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
			const result = await select('*', 'board', `boardnum = ${boardnum}`);
			if (result.rows.length > 0) {
				const result = await update(
					'show_flag',
					`'${flag}'::show_flag_t`,
					'board',
					`where boardnum = ${boardnum} returning *`
				);
				console.log(result);

				if (result.rowCount > 0) {
					const response = await axios.post(
						'https://hooks.slack.com/services/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',
						{ text: `${boardnum} 글 번호가 ${show} 글상태로 수정됨` }
					);
				} else {
					console.log('row count 0');
				}
			}
			res.json({
				respons_type: 'in_channel',
				text: `성공적으로 ${boardnum} 게시글이 ${show} 상태로 수정되었습니다.`,
			});
		} catch (err) {
			console.log(err);
			res.json({ status: 'error', err: err });
		}
	}
}

module.exports = new Controller();
