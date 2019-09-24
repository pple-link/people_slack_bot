const EDIT_FLAG = '/edit/:boardnum/:flag';
const SLACK_EDIT_FLAG = '/edit';

const routes = {
	// update: (id, flag) => {
	// 	if (id) {
	// 		console.log(id);
	// 		return `/edit/${id}/${flag}`;
	// 	} else {
	// 		return EDIT_FLAG;
	// 	}
	// },
	update: SLACK_EDIT_FLAG,
};

export default routes;
