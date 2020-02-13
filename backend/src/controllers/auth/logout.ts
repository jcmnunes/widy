import { Request, Response } from 'express';

/**
 * Logs the user out of the app
 *
 * endpoint ➜ GET /api/auth/logout
 */
export const logout = (req: Request, res: Response) => {
  const { COOKIE_KEY } = process.env;
  if (COOKIE_KEY) {
    res.clearCookie(COOKIE_KEY);
  }
  res.json({ message: '🥑' });
};
