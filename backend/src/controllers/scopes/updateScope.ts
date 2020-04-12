import Joi from 'joi';
import { AuthRequest } from '../types';
import { Response } from 'express';
import { ScopeModel } from '../../models/Scope';

interface Body {
  id: string;
  payload: {
    name: string;
    shortCode: string;
  };
}

const validate = (body: Body) => {
  const schema = {
    id: Joi.string().required(),
    payload: Joi.object({
      name: Joi.string().required(),
      shortCode: Joi.string().required(),
    }).required(),
  };

  return Joi.validate(body, schema);
};

interface Request extends AuthRequest {
  body: Body;
}

/**
 * Updates a scope
 *
 * endpoint ➜ PUT /api/scopes
 */
export const updateScope = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: {
      id,
      payload: { name, shortCode },
    },
    userId,
  } = req;

  // Check if scope name already exists
  const foundWithSameName = await ScopeModel.findOne({
    name,
    owner: userId,
    _id: { $ne: id },
  });
  if (foundWithSameName)
    return res.status(400).json({ field: 'name', error: 'Scope name exists.' });

  // Check if scope shortCode already exists
  const foundWithSameCode = await ScopeModel.findOne({
    shortCode,
    owner: userId,
    _id: { $ne: id },
  });
  if (foundWithSameCode)
    return res.status(400).json({ field: 'shortCode', error: 'Scope code exists.' });

  const scope = await ScopeModel.findOne({
    _id: id,
    owner: userId,
  });

  if (!scope) return res.status(404).json({ error: 'Scope not found ' });

  scope.name = name;
  scope.shortCode = shortCode;

  await scope.save();

  res.json(scope);
};
