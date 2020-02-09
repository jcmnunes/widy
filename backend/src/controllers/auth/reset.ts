import Joi from 'joi';
import bcrypt from 'bcrypt';
import { Response } from 'express';
import { UserModel } from '../../models/User';
import { AuthRequest } from '../types';

interface Body {
  password: string;
  confirm: string;
  token: string;
}

interface Request extends AuthRequest {
  body: Body;
}

const validate = (body: Body) => {
  const schema = {
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    confirm: Joi.string()
      .min(5)
      .max(255)
      .required(),
    token: Joi.string().allow(''),
  };

  return Joi.validate(body, schema);
};

/**
 * Resets the user password
 *
 * endpoint ➜ POST /api/auth/reset
 */
export const reset = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await UserModel.findOne({
    resetPasswordToken: req.body.token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user)
    return res.status(400).json({ message: 'Password reset token is invalid or has expired' });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();
  user.generateAuthToken(res);
  res.json({ message: '🥑' });
};
