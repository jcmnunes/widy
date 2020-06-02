import { Response } from 'express';
import { AuthRequest } from '../types';
import { ScopeModel } from '../../models/Scope';

type Query = {
  isArchived: string;
};

interface Request extends AuthRequest {
  query: Query;
  userId: string;
}

/**
 * Gets a list of scopes
 *
 * endpoint ➜ GET /api/scopes
 * endpoint ➜ GET /api/scopes?isArchived=1
 */
export const getScopes = async (req: Request, res: Response) => {
  const isArchived = typeof req.query.isArchived === 'string' ? req.query.isArchived : '0';

  const scopes = await ScopeModel.find({
    owner: req.userId,
    isArchived: isArchived === '1',
  });

  res.json(scopes);
};
