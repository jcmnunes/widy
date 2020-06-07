import Joi from 'joi';
import { Response } from 'express';
import { Types } from 'mongoose';
import { DayModel } from '../../models/Day';
import { SectionModel } from '../../models/Section';
import { AuthRequest } from '../types';
import { Task } from '../../models/Task';
import { ScheduleModel } from '../../models/Schedule';

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

  const schedule = await ScheduleModel.findOne({
    owner: req.userId,
  });

  if (!schedule) {
    return res.status(404).json({ error: 'Schedule not found' });
  }

  const newDay = new DayModel({
    day,
    sections: [
      new SectionModel({
        title: 'Plan',
        isPlan: true,
        tasks: schedule.tasks,
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

  // Remove all tasks in the schedule
  schedule.tasks = ([] as unknown) as Types.DocumentArray<Task>;
  await schedule.save();

  res.json({ id, day: savedDay });
};
