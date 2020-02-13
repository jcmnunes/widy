import { Response } from 'express';
import { DayModel } from '../models/Day';

interface Params {
  userId: string;
  dayId: string;
  sectionId: string;
  taskId: string;
  res: Response;
}

export const findTask = async ({ userId, dayId, sectionId, taskId, res }: Params) => {
  const day = await DayModel.findOne({ _id: dayId, belongsTo: userId });
  if (!day) return res.status(404).json({ error: 'Day not found' });

  const section = day.sections.id(sectionId);
  if (!section) return res.status(404).json({ error: 'Section not found' });

  const task = section.tasks.id(taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  return { task, section, day };
};
