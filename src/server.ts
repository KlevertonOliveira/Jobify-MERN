
import * as dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

/* Middleware */
app.use(express.json());

/* Routes */
app.get('/', (req, res) => {
  return res.send('Hello, World!');
});

/* Error Handlers */

/* Server Setup */
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to DB');
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));

  }
  catch (error) {
    console.log(error);
  }
};

start();