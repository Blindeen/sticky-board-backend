import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app.error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.status).json({ errors: [{ message: err.message }] });
    return;
  }
  res.status(500).json({ errors: [{ message: 'Internal Server Error' }] });
};
