import { Router } from 'express';
import JobController from '../controller/JobController';

const router = Router();

router.post('/', JobController.createJob);

router.get('/', JobController.getAllJobs);

router.get('/:id', JobController.getJobById);

router.delete('/:id', JobController.deleteJob);

router.put('/', JobController.updateJob);

export default router;