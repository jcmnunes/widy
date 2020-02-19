import Joi from 'joi';
import { Response } from 'express';
import { UserModel } from '../../models/User';
import { ScopeModel } from '../../models/Scope';
import { validateScope } from '../../helpers/validateScope';
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

  const user = await UserModel.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { scopes, archivedScopes } = user;

  // Check if scope name and code already exists
  const validationError = validateScope({
    name,
    shortCode,
    scopes,
    archivedScopes,
  });

  if (validationError) {
    return res.status(400).json(validationError);
  }

  const newScope = new ScopeModel({ name, shortCode });
  user.scopes.unshift(newScope);
  await user.save();

  res.json(newScope);
};
