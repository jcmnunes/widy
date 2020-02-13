import { Response } from 'express';
import { AuthRequest } from '../types';

/**
 * Checks if user is logged in
 *
 * endpoint ➜ GET /api/auth/check
 */
export const check = (req: AuthRequest, res: Response) => {
  if (req.userId) {
    return res.end();
  }
};
