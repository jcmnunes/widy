import { Request, Response } from 'express';

interface Error {
  status?: number;
  message?: string;
}

/**
 * Error handling middleware.
 *
 * Catches all async/await errors
 */
export default (err: Error, req: Request, res: Response) => {
  const { status = 500, message } = err;
  res.status(status).json(message);
};
