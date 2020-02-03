const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../../models/User');
const _ = require('lodash');

const validate = body => {
  const schema = {
    firstName: Joi.string()
      .min(1)
      .max(255)
      .required(),
    lastName: Joi.string()
      .min(1)
      .max(255)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
  };

  return Joi.validate(body, schema);
};

/**
 * Register a new user.
 *
 * endpoint ➜ POST /api/users
 */
const registerUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  user.generateAuthToken(res);
  res.send(_.pick(user, ['_id', 'firstName', 'lastName', 'email']));
};

module.exports = registerUser;
