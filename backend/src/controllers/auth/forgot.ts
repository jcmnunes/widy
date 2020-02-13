import Joi from 'joi';
import crypto from 'crypto';
import { Response } from 'express';
import mail from '../../services/mail';
import { UserModel } from '../../models/User';
import { AuthRequest } from '../types';

interface Body {
  email: string;
}

const validate = (body: Body) => {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
  };

  return Joi.validate(body, schema);
};

/**
 * Will send an email to reset password
 *
 * endpoint ➜ POST /api/auth/forgot
 */
export const forgot = async (req: AuthRequest, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetURL = `${process.env.FRONTEND_URL}/reset/${user.resetPasswordToken}`;
    await mail.send({
      user,
      subject: 'Password reset',
      resetURL,
      filename: 'password-reset',
    });
  }
  return res.status(200).json();
};
