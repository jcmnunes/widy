import Joi from 'joi';
import { Response } from 'express';
import { UserModel } from '../../models/User';
import { DayModel } from '../../models/Day';
import { SectionModel } from '../../models/Section';
import { AuthRequest } from '../types';

interface Body {
  day: string;
}

const validate = (body: Body) => {
  const schema = {
    day: Joi.date().iso(),
  };

  return Joi.validate(body, schema);
};

interface Request extends AuthRequest {
  body: Body;
}

/**
 * Creates a new day
 *
 * endpoint ➜ POST /api/days
 */
export const createDay = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { day } = req.body;
  const existingDaysArray = await DayModel.find({ day, belongsTo: req.userId });
  if (existingDaysArray.length > 0) {
    return res.status(400).json({ message: 'Day exists' });
  }

  const user = await UserModel.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found ' });

  const newDay = new DayModel({
    day,
    sections: [
      new SectionModel({
        title: 'Plan',
        isPlan: true,
        tasks: user.schedule,
      }),
      new SectionModel({
        title: 'In the morning',
        isPlan: false,
        tasks: [],
      }),
      new SectionModel({
        title: 'In the afternoon',
        isPlan: false,
        tasks: [],
      }),
    ],
    belongsTo: req.userId,
  });

  const { id, day: savedDay } = await newDay.save();

  user.schedule.forEach(task => task.remove());
  await user.save();

  res.json({ day: { id, day: savedDay }, message: '🥑' });
};
