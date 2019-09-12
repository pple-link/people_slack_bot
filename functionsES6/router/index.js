import express from 'express';
import ctrl from '../controller/indexCtrl';
const router = express.Router();

router.get('/:boardnum/edit/:flag', ctrl.update);

export default router;
