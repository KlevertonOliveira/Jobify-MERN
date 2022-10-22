
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { authRouter } from './routes/authRoutes';
import { jobsRouter } from './routes/jobsRoutes';

dotenv.config();

const app = express();

/* Middleware */
app.use(express.json());

/* Routes */
app.get('/', (req: Request, res: Response) => {
  return res.send('Hello, World!');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

/* Error handlers */
app.use(notFound);
app.use(errorHandler);

/* Server Setup */
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is running on http://localhost:${port}...`));

  }
  catch (error) {
    console.log(error);
  }
};

start();