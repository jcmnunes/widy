const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../../models/User');

const validate = body => {
  const schema = {
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    confirm: Joi.string()
      .min(5)
      .max(255)
      .required(),
    token: Joi.string().allow(''),
  };

  return Joi.validate(body, schema);
};

/**
 * Resets the user password
 *
 * endpoint ➜ POST /api/auth/reset
 */
const reset = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await User.findOne({
    resetPasswordToken: req.body.token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user)
    return res.status(400).json({ message: 'Password reset token is invalid or has expired' });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  user.generateAuthToken(res);
  res.json({ message: '🥑' });
};

module.exports = reset;
