/**
 * Logs the user out of the app
 *
 * endpoint ➜ GET /api/auth/logout
 */
const logout = (req, res) => {
  res.clearCookie(process.env.COOKIE_KEY);
  res.json({ message: '🥑' });
};

module.exports = logout;
