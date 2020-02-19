import Joi from 'joi';
import { UserModel } from '../../models/User';
import { validateScope } from '../../helpers/validateScope';
import { AuthRequest } from '../types';
import { Response } from 'express';

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

  const user = await UserModel.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { scopes, archivedScopes } = user;

  // Check if scope name and code already exists
  const validationError = validateScope({
    id,
    name,
    shortCode,
    scopes,
    archivedScopes,
  });

  if (validationError) {
    return res.status(400).json(validationError);
  }

  const scope = user.scopes.id(id);
  const archivedScope = user.archivedScopes.id(id);

  if (scope) {
    scope.set({ name, shortCode });
    await user.save();
    res.json(scope);
  }

  if (archivedScope) {
    archivedScope.set({ name, shortCode });
    await user.save();
    res.json(archivedScope);
  }

  res.status(404).json({ error: 'Scope not found ' });
};
