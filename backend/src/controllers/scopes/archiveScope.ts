import Joi from 'joi';
import { Response } from 'express';
import { UserModel } from '../../models/User';
import { AuthRequest } from '../types';

interface Body {
  id: string;
}

const validate = (body: Body) => {
  const schema = {
    id: Joi.string().required(),
  };

  return Joi.validate(body, schema);
};

interface Request extends AuthRequest {
  body: Body;
}

/**
 * Archives a scope
 *
 * endpoint ➜ PUT /api/scopes/archive
 */
export const archiveScope = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: { id },
    userId,
  } = req;

  const user = await UserModel.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const scope = user.scopes.id(id);
  if (!scope) return res.status(404).json({ error: 'Scope not found' });

  user.scopes.id(id).remove();
  user.archivedScopes.unshift(scope);
  await user.save();

  res.json(scope);
};
