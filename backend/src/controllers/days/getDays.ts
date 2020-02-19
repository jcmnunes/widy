import { Response } from 'express';
import { DayModel } from '../../models/Day';
import { AuthRequest } from '../types';

const MAX_DAYS = 100;

interface Request extends AuthRequest {}

/**
 * Gets a list of days
 *
 * endpoint ➜ GET /api/days
 */
export const getDays = async (req: Request, res: Response) => {
  const days = await DayModel.find({ belongsTo: req.userId })
    .select('day')
    .sort({ day: 'desc' })
    .limit(MAX_DAYS);
  res.json(days);
};
