import { select, update } from '../db/query';
import axios from 'axios';
import * as functions from 'firebase-functions';
import { deaes } from '../util/crypto';

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
	async find(req, res) {
		try {
			const functionConfig = () => functions.config();
			if (req.body.token != functionConfig().env['token']) {
				throw new Error('허가되지 않은 토큰');
			}
			const data = req.body.text.split(' ');
			let boardnum, nickname, query;
			if (data.length == 2) {
				nickname = data[1];
				query = `nickname=${nickname}`;
			} else {
				boardnum = data[0];
				query = `usernum = (select author from board where boardnum = '${boardnum}')`;
			}

			// select nickname from member where id = (selecgt author from board where boardnum = $boardnum)
			const result = await select('nickname, phone, email', 'member', query);
			nickname = deaes(result.rows[0].nickname);
			const phone = deaes(result.rows[0].phone);
			const email = deaes(result.rows[0].email);

			const response = await axios.post(
				'https://hooks.slack.com/services/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',
				{ text: `닉네임 : ${nickname} \n phone: ${phone} \n email : ${email}` }
			);

			res.json({
				respons_type: 'in_channel',
				text: `닉네임 : ${nickname} \n phone: ${phone} \n email : ${email}`,
			});
		} catch (err) {
			console.log(err);
			res.json({ status: 'error', err: err });
		}
	}
}

module.exports = new Controller();
