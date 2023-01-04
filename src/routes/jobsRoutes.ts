import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  showStats,
  updateJob,
} from '@controllers/jobs';
import express from 'express';
import { checkTestUser } from 'src/middleware/checkTestUser';
export const jobsRouter = express.Router();

jobsRouter.route('/').post(checkTestUser, createJob).get(getAllJobs);
jobsRouter.route('/stats').get(showStats);
jobsRouter
  .route('/:id')
  .get(getJob)
  .patch(checkTestUser, updateJob)
  .delete(checkTestUser, deleteJob);
