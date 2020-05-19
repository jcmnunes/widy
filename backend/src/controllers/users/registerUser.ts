import { Response } from 'express';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import pick from 'lodash/pick';
import { UserModel } from '../../models/User';
import { AuthRequest } from '../types';
import { ScheduleModel } from '../../models/Schedule';

interface Body {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const validate = (body: Body) => {
  const schema = {
    firstName: Joi.string().min(1).max(255).required(),
    lastName: Joi.string().min(1).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(body, schema);
};

interface Request extends AuthRequest {
  body: Body;
}

/**
 * Register a new user.
 *
 * endpoint ➜ POST /api/users
 */
export const registerUser = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await UserModel.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new UserModel(pick(req.body, ['firstName', 'lastName', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const schedule = new ScheduleModel({
    owner: user._id,
    tasks: [],
  });
  await schedule.save();

  user.generateAuthToken(res);
  res.send(pick(user, ['_id', 'firstName', 'lastName', 'email']));
};
