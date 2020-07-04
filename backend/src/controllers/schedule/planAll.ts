import Joi from 'joi';
import { Response } from 'express';
import { AuthRequest } from '../types';
import { ScheduleModel } from '../../models/Schedule';
import { DayModel } from '../../models/Day';
import { Task } from '../../models/Task';
import { Types } from 'mongoose';

interface Body {
  dayId: string;
}

const validate = (body: Body) => {
  const schema = {
    dayId: Joi.string().required(),
  };

  return Joi.validate(body, schema);
};

interface Request extends AuthRequest {
  body: Body;
}

/**
 * Add all schedule tasks to the plan
 *
 * endpoint ➜ POST /api/schedule/planAll
 */
export const planAll = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const {
    body: { dayId },
    userId,
  } = req;

  const schedule = await ScheduleModel.findOne({
    owner: userId,
  }).populate('tasks.scope');

  if (!schedule) {
    return res.status(404).json({ error: 'Schedule not found' });
  }

  const day = await DayModel.findOne({ _id: dayId, belongsTo: userId }).populate(
    'sections.tasks.scope',
  );
  if (!day) return res.status(404).json({ error: 'Day not found' });

  const plan = day.sections[0];
  if (!plan) return res.status(404).json({ error: 'Plan not found' });

  plan.tasks = [...plan.tasks, ...schedule.tasks] as Types.DocumentArray<Task>;

  // Remove all tasks in the schedule
  schedule.tasks = ([] as unknown) as Types.DocumentArray<Task>;

  await schedule.save();
  await day.save();

  res.json(day);
};
