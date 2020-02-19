import Joi from 'joi';
import { Response } from 'express';
import { AuthRequest } from '../types';
import { DayModel } from '../../models/Day';

type Params = { id: string };

const validate = (params: Params) => {
  const schema = {
    id: Joi.string().required(),
  };

  return Joi.validate(params, schema);
};

export interface Request extends AuthRequest {
  params: Params;
}

/**
 * Gets a day by Id
 *
 * endpoint ➜ GET /api/days/:id
 */
export const getDay = async (req: Request, res: Response) => {
  const { error } = validate(req.params);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const {
    params: { id },
    userId,
  } = req;
  const day = await DayModel.findOne({
    _id: id,
    belongsTo: userId,
  });
  if (!day) return res.status(404).json({ error: 'Day not found' });

  res.send(day);
};
