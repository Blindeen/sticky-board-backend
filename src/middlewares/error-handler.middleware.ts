import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app.error';

export const errorHandler = (err: Error, _: Request, res: Response, _2: NextFunction) => {
  console.error(err);
  if (err instanceof AppError) {
    res.status(err.status).json({ errors: [{ message: err.message }] });
    return;
  }
  res.status(500).json({ errors: [{ message: 'Internal Server Error' }] });
};
