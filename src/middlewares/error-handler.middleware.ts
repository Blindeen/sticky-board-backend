import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { AppError } from '../errors/app.error';

export const errorHandler = (err: Error, _: Request, res: Response, _2: NextFunction) => {
  console.error(err);
  if (err instanceof AppError) {
    res.status(err.status).json({ errors: [{ message: err.message }] });
    return;
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ errors: [{ message: ReasonPhrases.INTERNAL_SERVER_ERROR }] });
};
