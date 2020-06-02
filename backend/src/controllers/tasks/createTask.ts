import Joi from 'joi';
import { DayModel } from '../../models/Day';
import { TaskModel } from '../../models/Task';
import { AuthRequest } from '../types';
import { Response } from 'express';

interface Body {
  dayId: string;
  sectionId: string;
  payload: {
    title: string;
    scope?: string;
    notes?: string;
    time?: number;
    start?: number;
    completed?: boolean;
  };
}

const validate = (body: Body) => {
  const schema = {
    dayId: Joi.string().required(),
    sectionId: Joi.string().required(),
    payload: Joi.object({
      title: Joi.string().min(1).max(500).required(),
      notes: Joi.object().allow('').allow(null),
      time: Joi.number().allow(null),
      start: Joi.date().allow(null),
      completed: Joi.boolean().allow(null),
      scope: Joi.string().allow(null),
    }),
  };

  return Joi.validate(body, schema);
};

interface Request extends AuthRequest {
  body: Body;
}

/**
 * Creates a new task
 *
 * endpoint ➜ POST /api/tasks
 */
export const createTask = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: { dayId, sectionId, payload },
    userId,
  } = req;

  const newTask = {
    notes: '',
    time: 0,
    start: null,
    scope: null,
    completed: false,
    ...payload,
  };

  const day = await DayModel.findOne({
    _id: dayId,
    belongsTo: userId,
  });

  if (!day) return res.status(404).json({ error: 'Day not found' });

  const section = day.sections.id(sectionId);
  if (!section) return res.status(404).json({ error: 'Section not found' });

  const task = new TaskModel(newTask);
  section.tasks.push(task);

  await day.save();

  const savedDay = await DayModel.findOne({
    _id: dayId,
    belongsTo: userId,
  }).populate('sections.tasks.scope');

  res.json(savedDay);
};
