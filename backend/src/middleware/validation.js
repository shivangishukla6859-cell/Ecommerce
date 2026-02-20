import { validationResult } from 'express-validator';
import { AppError } from '../utils/errorHandler.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    throw new AppError(errorMessages, 400);
  }
  next();
};
