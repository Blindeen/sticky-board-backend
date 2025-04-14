import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  constructor(
    public message: string,
    public status: StatusCodes,
  ) {
    super(message);
  }
}
