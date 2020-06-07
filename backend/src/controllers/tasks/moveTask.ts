import Joi from 'joi';
import { Response } from 'express';
import { DayModel } from '../../models/Day';
import { insert, move, remove } from '../../helpers/arrayHelpers';
import { AuthRequest } from '../types';
import { Task } from '../../models/Task';
import { Types } from 'mongoose';

type Params = {
  id: string;
};

interface Body {
  dayId: string;
  fromSectionId: string;
  toSectionId: string;
  fromIndex: number;
  toIndex: number | null;
  start?: string;
}

const validate = (params: Params, body: Body) => {
  const schema = {
    id: Joi.string().required(),
    dayId: Joi.string().required(),
    fromSectionId: Joi.string().required(),
    toSectionId: Joi.string().required(),
    fromIndex: Joi.number().required(),
    toIndex: Joi.number().required().allow(null),
    start: Joi.string().required().optional(),
  };

  return Joi.validate({ ...params, ...body }, schema);
};

interface Request extends AuthRequest {
  params: Params;
  body: Body;
}

/**
 * Moves a task
 *
 * endpoint ➜ PUT /api/tasks/:id/move
 *
 * This endpoint has two edge cases at the moment.
 * The first one is related to the value of the `toIndex` prop.
 * When it is null the task is appended to the section.
 *
 * The second one is related to the optional `start` prop. This prop
 * should be defined when launching a task.
 */
export const moveTask = async (req: Request, res: Response) => {
  const { error } = validate(req.params, req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    params: { id: taskId },
    body: { dayId, fromSectionId, toSectionId, fromIndex, toIndex, start },
    userId,
  } = req;

  const day = await DayModel.findOne({
    _id: dayId,
    belongsTo: userId,
  });
  if (!day) return res.status(404).json({ error: 'Day not found' });

  const fromSection = day.sections.id(fromSectionId);
  if (!fromSection) return res.status(404).json({ error: 'Source Section not found' });

  const toSection = day.sections.id(toSectionId);
  if (!toSection) return res.status(404).json({ error: 'Destination Section not found' });

  const task = fromSection.tasks.id(taskId);
  if (!task) return res.status(404).json({ error: 'No task found' });

  if (fromSectionId === toSectionId) {
    if (toIndex !== null) {
      fromSection.tasks = move(fromSection.tasks, fromIndex, toIndex) as Types.DocumentArray<Task>;
    }
  } else {
    // Moving a task to the plan resets the time to zero
    if (toSection.isPlan) {
      task.time = 0;
      task.start = null;
      task.completed = false;
    }

    // Launching a task
    if (start) {
      task.start = start;
    }

    fromSection.tasks = remove(fromSection.tasks, fromIndex) as Types.DocumentArray<Task>;

    // If toIndex is not specified ➜ append the task
    if (toIndex === null) {
      toSection.tasks = [...toSection.tasks, task] as Types.DocumentArray<Task>;
    } else {
      toSection.tasks = insert(toSection.tasks, toIndex, task) as Types.DocumentArray<Task>;
    }
  }

  await day.save();
  res.json({ message: '🥑' });
};
