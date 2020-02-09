import Joi from 'joi';
import { Response } from 'express';
import { UserModel } from '../../models/User';
import { AuthRequest } from '../types';

interface Body {
  pomodoroSettings: {
    pomodoroLength: number;
    shortBreak: number;
    longBreak: number;
    longBreakAfter: number;
  };
}

const validate = (body: Body) => {
  const schema = {
    pomodoroSettings: Joi.object()
      .keys({
        pomodoroLength: Joi.number().required(),
        shortBreak: Joi.number().required(),
        longBreak: Joi.number().required(),
        longBreakAfter: Joi.number().required(),
      })
      .required(),
  };

  return Joi.validate(body, schema);
};

interface Request extends AuthRequest {
  body: Body;
}

/**
 * Updates the pomodoro settings
 *
 * endpoint ➜ PUT /api/settings/pomodoro
 */
export const updatePomodoroSettings = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: { pomodoroSettings },
    userId,
  } = req;

  const user = await UserModel.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.settings.pomodoro = pomodoroSettings;

  await user.save();
  res.json({ message: '🥑🥥' });
};
