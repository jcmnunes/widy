const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../../models/User');

const validate = body => {
  const schema = {
    oldPassword: Joi.string()
      .min(5)
      .max(255)
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    confirm: Joi.string()
      .min(5)
      .max(255)
      .required(),
  };

  return Joi.validate(body, schema);
};

/**
 * Changes the user password
 *
 * endpoint ➜ POST /api/auth/change
 */
const change = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const {
    body: { oldPassword, password },
  } = req;

  if (password === oldPassword) {
    return res.status(400).json({ message: 'New password cannot be the same' });
  }

  const user = await User.findById(req.userId).select('password');

  const validPassword = await bcrypt.compare(oldPassword, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Wrong password' });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();
  res.json({ message: '🥑' });
};

module.exports = change;
