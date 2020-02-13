import Joi from 'joi';
import bcrypt from 'bcrypt';
import { Response } from 'express';
import { UserModel } from '../../models/User';
import { AuthRequest } from '../types';

interface Body {
  oldPassword: string;
  password: string;
  confirm: string;
}

interface Request extends AuthRequest {
  body: Body;
}

const validate = (body: Body) => {
  const schema = {
    oldPassword: Joi.string()
      .min(5)
      .max(255)
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    confirm: Joi.string()
      .min(5)
      .max(255)
      .required(),
  };

  return Joi.validate(body, schema);
};

/**
 * Changes the user password
 *
 * endpoint ➜ POST /api/auth/change
 */
export const change = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const {
    body: { oldPassword, password },
  } = req;

  if (password === oldPassword) {
    return res.status(400).json({ message: 'New password cannot be the same' });
  }

  const user = await UserModel.findById(req.userId).select('password');

  if (user) {
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Wrong password' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.json({ message: '🥑' });
  }
};
