import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { authenticateUser } from './middleware/authenticateUser';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { authRouter } from './routes/authRoutes';
import { jobsRouter } from './routes/jobsRoutes';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

dotenv.config();

const app = express();

/* Middleware */
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

/* Routes */
app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Hello, World!' });
});

app.get('/api/v1', (req: Request, res: Response) => {
  res.json({ msg: 'API!' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

/* Error handlers */
app.use(notFound);
app.use(errorHandler);

/* Server Setup */
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is running on http://localhost:${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
