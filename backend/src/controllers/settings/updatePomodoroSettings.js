const Joi = require('joi');
const { User } = require('../../models/User');

const validate = body => {
  const schema = {
    pomodoroSettings: Joi.object()
      .keys({
        pomodoroLength: Joi.number().required(),
        shortBreak: Joi.number().required(),
        longBreak: Joi.number().required(),
        longBreakAfter: Joi.number().required(),
      })
      .required(),
  };

  return Joi.validate(body, schema);
};

/**
 * Updates the pomodoro settings
 *
 * endpoint ➜ PUT /api/settings/pomodoro
 */
const updatePomodoroSettings = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: { pomodoroSettings },
    userId,
  } = req;

  const user = await User.findById(userId);
  user.settings.pomodoro = pomodoroSettings;

  await user.save();
  res.json({ message: '🥑🥥' });
};

module.exports = updatePomodoroSettings;
