import Job from '../models/Job';
import {Request, Response} from 'express';

const createJob = async (req: Request, res: Response) => {
    res.send(await Job.createJob(req.body));
}

const getAllJobs = (req: Request, res: Response) => {
    Job.getJobs().then(allJobs => res.send(allJobs));
}

const getJobById = (req: Request, res: Response) => {
    Job.getJobById(req.params.id).then(job => res.send(job));
}

const deleteJob = (req: Request, res: Response) => {
    Job.deleteJobById(req.params.id).then(deleted => res.send(deleted));
}

const updateJob = (req: Request, res: Response) => {
    Job.updateJobById(req.body.id, req.body).then(updated => res.send(updated));
}

export default {
    createJob,
    getAllJobs,
    getJobById,
    deleteJob,
    updateJob,
}