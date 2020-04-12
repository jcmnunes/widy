import Joi from 'joi';
import { Response } from 'express';
import { ScopeModel } from '../../models/Scope';
import { AuthRequest } from '../types';

interface Body {
  name: string;
  shortCode: string;
}

const validate = (body: Body) => {
  const schema = {
    name: Joi.string().required(),
    shortCode: Joi.string().required(),
  };

  return Joi.validate(body, schema);
};

interface Request extends AuthRequest {
  body: Body;
}

/**
 * Creates a new scope
 *
 * endpoint ➜ POST /api/scopes
 */
export const createScope = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: { name, shortCode },
    userId,
  } = req;

  // Check if scope name already exists
  const foundWithSameName = await ScopeModel.findOne({
    name,
    owner: userId,
  });
  if (foundWithSameName)
    return res.status(400).json({ field: 'name', error: 'Scope name exists.' });

  // Check if scope shortCode already exists
  const foundWithSameCode = await ScopeModel.findOne({
    shortCode,
    owner: userId,
  });
  if (foundWithSameCode)
    return res.status(400).json({ field: 'shortCode', error: 'Scope code exists.' });

  const scope = new ScopeModel({ name, shortCode, owner: userId });
  const newScope = await scope.save();

  res.json(newScope);
};
