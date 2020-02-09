import Joi from 'joi';
import { Response } from 'express';
import { DayModel } from '../../models/Day';
import { AuthRequest } from '../types';

interface Body {
  dayId: string;
  sectionId: string;
}

const validate = (body: Body) => {
  const schema = {
    dayId: Joi.string().required(),
    sectionId: Joi.string().required(),
  };

  return Joi.validate(body, schema);
};

interface Request extends AuthRequest {
  body: Body;
}

/**
 * Gets list of tasks
 *
 * endpoint ➜ GET /api/tasks
 */
export const getTasks = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: { dayId, sectionId },
    userId,
  } = req;

  const day = await DayModel.findOne({
    _id: dayId,
    belongsTo: userId,
  });
  if (!day) return res.status(404).json({ error: 'Day not found' });

  const section = day.sections.id(sectionId);
  if (!section) return res.status(404).json({ error: 'Section not found' });

  res.json(section.tasks);
};
