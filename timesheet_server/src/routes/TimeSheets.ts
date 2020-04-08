import { Router } from 'express';
import TimeSheetController from '../controller/TimeSheetController';

const router = Router();

router.post('/', TimeSheetController.createTimeSheet);

router.delete('/:id', TimeSheetController.deleteTimeSheetById);

router.get('/', TimeSheetController.getAllTimeSheets);

router.get('/:id', TimeSheetController.getTimeSheetById);

router.put('/', TimeSheetController.updateTimeSheetById);

export default router;