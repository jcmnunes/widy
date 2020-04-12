import { Response } from 'express';
import { DayModel } from '../../models/Day';
import { AuthRequest } from '../types';

interface Request extends AuthRequest {
  body: Body;
}

export interface ActiveTask {
  taskId: string;
  sectionId: string;
  dayId: string;
  inBreak: boolean;
  title: string;
  time: number;
  start: string | null;
}

/**
 * Gets the current active task info
 *
 * endpoint ➜ GET /api/tasks/active
 */
export const getActiveTask = async (req: Request, res: Response) => {
  const activeTask: ActiveTask = {
    taskId: '',
    sectionId: '',
    dayId: '',
    inBreak: false,
    title: '',
    time: 0,
    start: null,
  };

  const { userId } = req;

  const resultArray = await DayModel.getActiveTask(userId);

  if (resultArray.length > 0) {
    activeTask.taskId = resultArray[0].sections.tasks._id;
    activeTask.time = resultArray[0].sections.tasks.time;
    activeTask.start = resultArray[0].sections.tasks.start;
    activeTask.title = resultArray[0].sections.tasks.title;
    activeTask.sectionId = resultArray[0].sections._id;
    activeTask.dayId = resultArray[0]._id;
  }

  res.json(activeTask);
};
