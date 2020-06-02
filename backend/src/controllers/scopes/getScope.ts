import { Response } from 'express';
import Joi from 'joi';
import { AuthRequest } from '../types';
import { ScopeModel } from '../../models/Scope';

type Params = { id: string };

const validate = (params: Params) => {
  const schema = {
    id: Joi.string().required(),
  };

  return Joi.validate(params, schema);
};

interface Request extends AuthRequest {
  params: Params;
}

/**
 * Get a scope by Id
 *
 * endpoint ➜ GET /api/scopes/:id
 */
export const getScope = async (req: Request, res: Response) => {
  const { error } = validate(req.params);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const {
    params: { id },
    userId,
  } = req;

  const scope = await ScopeModel.findOne({ _id: id, owner: userId });

  if (!scope) return res.status(404).json({ error: 'Scope not found' });

  res.json(scope);
};
