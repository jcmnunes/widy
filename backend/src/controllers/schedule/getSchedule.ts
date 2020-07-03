import { Response } from 'express';
import { AuthRequest } from '../types';
import { ScheduleModel } from '../../models/Schedule';

interface Request extends AuthRequest {}

/**
 * Gets the user's schedule
 *
 * endpoint ➜ GET /api/schedule
 */
export const getSchedule = async (req: Request, res: Response) => {
  const schedule = await ScheduleModel.findOne({
    owner: req.userId,
  }).populate('tasks.scope');

  if (!schedule) {
    return res.status(404).json({ error: 'Schedule not found' });
  }

  res.json(schedule);
};
