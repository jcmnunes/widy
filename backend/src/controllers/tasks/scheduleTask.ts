import Joi from 'joi';
import { Response } from 'express';
import { AuthRequest } from '../types';
import { DayModel } from '../../models/Day';
import { ScheduleModel } from '../../models/Schedule';

type Params = {
  id: string;
};

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
  params: Params;
}

/**
 * Schedules a task
 *
 * endpoint ➜ POST /api/tasks/:id/schedule
 */
export const scheduleTask = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    params: { id: taskId },
    body: { dayId, sectionId },
    userId,
  } = req;

  const day = await DayModel.findOne({ _id: dayId, belongsTo: userId });
  if (!day) return res.status(404).json({ error: 'Day not found' });

  const section = day.sections.id(sectionId);
  if (!section) return res.status(404).json({ error: 'Section not found' });

  const task = section.tasks.id(taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  if (task.time > 0) {
    return res.status(400).json({ error: 'Task has time logged already' });
  }
  if (task.completed) {
    return res.status(400).json({ error: 'Task is completed already' });
  }
  if (task.start) {
    return res.status(400).json({ error: 'Task is in progress' });
  }

  const taskToRemove = section.tasks.id(taskId);

  if (taskToRemove) {
    taskToRemove.remove();
  }

  const schedule = await ScheduleModel.findOne({
    owner: userId,
  });

  if (!schedule) {
    return res.status(404).json({ error: 'Schedule not found' });
  }

  schedule.tasks.push(task);

  await day.save();
  await schedule.save();

  res.json(task);
};
