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
 * Deletes a Scope
 *
 * endpoint ➜ DELETE /api/scopes/:id
 */
export const deleteScope = async (req: Request, res: Response) => {
  const { error } = validate(req.params);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    params: { id },
    userId,
  } = req;

  try {
    await ScopeModel.findOneAndDelete({
      _id: id,
      owner: userId,
    });
  } catch (err) {
    return res.status(404).json({ error: 'Scope not found' });
  }

  res.json({ message: '🥑' });
};
