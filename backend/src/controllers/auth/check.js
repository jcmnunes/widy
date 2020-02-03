/**
 * Checks if user is logged in
 *
 * endpoint ➜ GET /api/auth/check
 */
const check = (req, res) => {
  if (req.userId) {
    return res.end();
  }
};

module.exports = check;
