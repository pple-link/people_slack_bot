import express from 'express';
import ctrl from '../controller/indexCtrl';
import route from '../route';
const router = express.Router();

router.post(route.update, ctrl.update);
router.post(route.find, ctrl.find);

export default router;
