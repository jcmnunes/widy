const { User } = require('../../models/User');

/**
 * Gets the pomodoro settings of the user
 *
 * endpoint ➜ GET /api/settings/pomodoro
 */
const getPomodoroSettings = async (req, res) => {
  const user = await User.findById(req.userId);
  res.send(user.settings.pomodoro);
};

module.exports = getPomodoroSettings;
