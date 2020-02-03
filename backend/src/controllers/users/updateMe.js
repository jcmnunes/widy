const { User } = require('../../models/User');
const Joi = require('joi');

const validate = body => {
  const schema = {
    accountSettings: Joi.object().keys({
      firstName: Joi.string()
        .min(1)
        .max(255)
        .required(),
      lastName: Joi.string()
        .min(1)
        .max(255)
        .required(),
    }),
  };

  return Joi.validate(body, schema);
};

/**
 * Updates the current logged user data
 *
 * endpoint ➜ PUT /api/users/me
 */
const updateMe = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: {
      accountSettings: { firstName, lastName },
    },
  } = req;

  const user = await User.findById(req.userId);

  user.firstName = firstName;
  user.lastName = lastName;

  await user.save();
  res.json({ message: '🥑🥥' });
};

module.exports = updateMe;
