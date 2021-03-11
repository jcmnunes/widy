import { Response } from 'express';
import Joi from 'joi';
import { UserModel } from '../../models/User';
import { AuthRequest } from '../types';

interface Body {
  accountSettings: {
    firstName: string;
    lastName: string;
  };
}

const validate = (body: Body) => {
  const schema = {
    accountSettings: Joi.object().keys({
      firstName: Joi.string().min(1).max(255).required(),
      lastName: Joi.string().min(1).max(255).required(),
    }),
  };

  return Joi.validate(body, schema);
};

interface Request extends AuthRequest {
  body: Body;
}

/**
 * Updates the current logged user data
 *
 * endpoint ➜ PUT /api/users/me
 */
export const updateMe = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: {
      accountSettings: { firstName, lastName },
    },
  } = req;

  const user = await UserModel.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.firstName = firstName;
  user.lastName = lastName;

  await user.save();
  res.json({ message: '🥑🥥' });
};
