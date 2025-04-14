import { StatusCodes } from 'http-status-codes';
import { AppError } from './app.error';

export class UserAlreadyExistError extends AppError {
  constructor() {
    super('User already exist', StatusCodes.BAD_REQUEST);
  }
}

export class InvalidCredentialsError extends AppError {
  constructor() {
    super('Invalid credentials', StatusCodes.UNAUTHORIZED);
  }
}
