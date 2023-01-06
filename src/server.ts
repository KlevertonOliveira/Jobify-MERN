import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import xss from 'xss-clean';
import { authenticateUser } from './middleware/authenticateUser';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { authRouter } from './routes/authRoutes';
import { jobsRouter } from './routes/jobsRoutes';

dotenv.config();

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/dist')));

/* Middleware */
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());

app.get('/api/v1', (req: Request, res: Response) => {
  res.json({ msg: 'API!' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

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
