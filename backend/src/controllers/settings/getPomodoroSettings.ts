import { Response } from 'express';
import { UserModel } from '../../models/User';
import { AuthRequest } from '../types';

interface Request extends AuthRequest {}

/**
 * Gets the pomodoro settings of the user
 *
 * endpoint ➜ GET /api/settings/pomodoro
 */
export const getPomodoroSettings = async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.send(user.settings.pomodoro);
};
