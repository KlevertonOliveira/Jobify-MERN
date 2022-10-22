import { createJob, deleteJob, getAllJobs, showStats, updateJob } from '@controllers/jobs';
import express from 'express';
export const jobsRouter = express.Router();

jobsRouter.route('/').post(createJob).get(getAllJobs);
jobsRouter.route('/stats').get(showStats);
jobsRouter.route('/:id').patch(updateJob).delete(deleteJob);