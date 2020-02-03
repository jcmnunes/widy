const { User } = require('../../models/User');

/**
 * Gets the current logged in user data
 *
 * endpoint ➜ GET /api/users/me
 */
const getMe = async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user);
};

module.exports = getMe;
