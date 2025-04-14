import express from 'express';

import userRouter from './routes/user.router';
import { errorHandler } from './middlewares/error-handler.middleware';

const app = express();

app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use(errorHandler);

export default app;
