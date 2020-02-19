import Joi from 'joi';
import { Response } from 'express';
import { UserModel } from '../../models/User';
import { AuthRequest } from '../types';
import { DayModel } from '../../models/Day';
import { Scope } from '../../models/Scope';

type Params = {
  dayId: string;
};

const validate = (params: Params) => {
  const schema = {
    dayId: Joi.string().required(),
  };

  return Joi.validate(params, schema);
};

interface Request extends AuthRequest {
  params: Params;
}

interface ReportTask {
  id: string;
  title: string;
  time: number;
  completed: boolean;
  scope: Scope | null;
  section: {
    id: string;
    title: string;
    isPlan: boolean;
  };
}

/**
 * Gets report data
 *
 * endpoint ➜ GET /api/report/:dayId
 */
export const getReport = async (req: Request, res: Response) => {
  const { error } = validate(req.params);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const {
    params: { dayId },
    userId,
  } = req;

  const day = await DayModel.findOne({ _id: dayId, belongsTo: userId });
  if (!day) return res.status(404).json({ error: 'Day not found' });
  const user = await UserModel.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const getScope = (scopeId: string | null) => {
    if (scopeId) {
      return user.scopes.id(scopeId) || user.archivedScopes.id(scopeId);
    }
    return null;
  };

  const tasks = day.sections.reduce<ReportTask[]>((acc, section) => {
    const { tasks, _id: sectionId, title, isPlan } = section;
    return [
      ...acc,
      ...tasks.map(({ id, title: taskTitle, time, scopeId, completed }) => ({
        id,
        title: taskTitle,
        time,
        completed,
        scope: getScope(scopeId),
        section: { id: sectionId, title, isPlan },
      })),
    ];
  }, []);
  const totalTime = tasks.reduce((acc, { time }) => acc + time, 0);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  res.json({
    dayId: day._id,
    day: day.day,
    totalTime,
    totalTasks,
    completedTasks,
    tasks,
  });
};
