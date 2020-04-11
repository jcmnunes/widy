import { Response } from 'express';
import { DayModel } from '../../models/Day';
import { AuthRequest } from '../types';

const MAX_DAYS = 100;

type Query = {
  page: string;
};

interface Request extends AuthRequest {
  query: Query;
}

/**
 * Gets a list of days
 *
 * endpoint ➜ GET /api/days
 * endpoint ➜ GET /api/days?page=1
 */
export const getDays = async (req: Request, res: Response) => {
  const page = typeof req.query.page === 'string' ? req.query.page : '1';

  const options = {
    select: 'day',
    page: parseInt(page),
    sort: { day: 'desc' },
    limit: MAX_DAYS,
  };

  const result = await DayModel.paginate({ belongsTo: req.userId }, options);

  res.json({
    days: result.docs,
    nextPage: result.nextPage,
  });
};
