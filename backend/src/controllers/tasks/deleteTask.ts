import Joi from 'joi';
import { Response } from 'express';
import { DayModel } from '../../models/Day';
import { AuthRequest } from '../types';
import { ScheduleModel } from '../../models/Schedule';

type Params = {
  id: string;
};

interface Body {
  dayId: string;
  sectionId: string;
}

const validate = (params: Params, body: Body) => {
  const schema = {
    id: Joi.string().required(),
    dayId: Joi.string().required(),
    sectionId: Joi.string().required(),
  };

  return Joi.validate({ ...params, ...body }, schema);
};

interface Request extends AuthRequest {
  params: Params;
  body: Body;
}

/**
 * Updates a task
 *
 * endpoint ➜ DELETE /api/tasks/:id
 */
export const deleteTask = async (req: Request, res: Response) => {
  const { error } = validate(req.params, req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    params: { id: taskId },
    body: { dayId, sectionId },
    userId,
  } = req;

  const day = await DayModel.findOne({
    _id: dayId,
    belongsTo: userId,
  });
  if (!day) return res.status(404).json({ error: 'Day not found' });

  if (sectionId === 'schedule') {
    const schedule = await ScheduleModel.findOne({
      owner: req.userId,
    });

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    const task = schedule.tasks.id(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.remove();
    await schedule.save();

    res.json(task);
  }

  const section = day.sections.id(sectionId);
  if (!section) return res.status(404).json({ error: 'Section not found' });

  const task = section.tasks.id(taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.remove();
  await day.save();

  res.json(task);
};
