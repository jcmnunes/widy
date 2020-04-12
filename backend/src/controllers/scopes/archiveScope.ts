import Joi from 'joi';
import { Response } from 'express';
import { AuthRequest } from '../types';
import { ScopeModel } from '../../models/Scope';

type Params = {
  id: string;
};

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
 * Archives a scope
 *
 * endpoint ➜ PUT /api/scopes/:id/archive
 */
export const archiveScope = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    params: { id },
    userId,
  } = req;

  const scope = await ScopeModel.findOne({ _id: id, owner: userId });

  if (!scope) return res.status(404).json({ error: 'Scope not found' });

  if (scope.isArchived) return res.status(400).json({ error: 'Scope is already archived' });

  scope.isArchived = true;
  await scope.save();

  res.json(scope);
};
