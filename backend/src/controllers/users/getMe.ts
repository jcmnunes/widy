import { Response } from 'express';
import { UserModel } from '../../models/User';
import { AuthRequest } from '../types';

interface Request extends AuthRequest {}

/**
 * Gets the current logged in user data
 *
 * endpoint ➜ GET /api/users/me
 */
export const getMe = async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.userId);
  res.json(user);
};
