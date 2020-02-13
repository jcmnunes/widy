import Joi from 'joi';
import { Response } from 'express';
import moment from 'moment';
import { AuthRequest } from '../types';
import { DayModel } from '../../models/Day';

type Params = {
  id: string;
};

interface Body {
  dayId: string;
  sectionId: string;
  start: number;
}

const validate = (params: Params, body: Body) => {
  const schema = {
    id: Joi.string().required(),
    dayId: Joi.string().required(),
    sectionId: Joi.string().required(),
    start: Joi.date().required(),
  };

  return Joi.validate({ ...params, ...body }, schema);
};

interface Request extends AuthRequest {
  params: Params;
  body: Body;
}

/**
 * Starts a task
 *
 * endpoint ➜ PUT /api/tasks/:id/start
 */
export const startTask = async (req: Request, res: Response) => {
  const { error } = validate(req.params, req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    params: { id: taskId },
    body: { dayId, sectionId, start },
    userId,
  } = req;

  const day = await DayModel.findOne({ _id: dayId, belongsTo: userId });
  if (!day) return res.status(404).json({ error: 'Day not found' });

  const section = day.sections.id(sectionId);
  if (!section) return res.status(404).json({ error: 'Section not found' });

  const task = section.tasks.id(taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.set({ start: moment(start).toISOString() });

  await day.save();
  res.json({ message: '🥑' });
};
