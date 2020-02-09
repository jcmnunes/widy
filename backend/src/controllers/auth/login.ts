import Joi from 'joi';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserModel } from '../../models/User';

interface Body {
  email: string;
  password: string;
}

const validate = (body: Body) => {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
  };

  return Joi.validate(body, schema);
};

/**
 * Logs the user into the app
 *
 * endpoint ➜ POST /api/auth/login
 */
export const login = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  user.generateAuthToken(res);
  res.json(user);
};
