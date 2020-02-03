const Joi = require('joi');
const { User } = require('../../models/User');
const { Scope } = require('../../models/Scope');
const { validateScope } = require('../../helpers/validateScope');

const validate = body => {
  const schema = {
    name: Joi.string().required(),
    shortCode: Joi.string().required(),
  };

  return Joi.validate(body, schema);
};

/**
 * Creates a new scope
 *
 * endpoint ➜ POST /api/scopes
 */
const createScope = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: { name, shortCode },
    userId,
  } = req;

  const user = await User.findById(userId);
  const { scopes, archivedScopes } = user;

  // Check if scope name and code already exists
  const validationError = validateScope({
    name,
    shortCode,
    scopes,
    archivedScopes,
    res,
  });

  if (validationError) {
    return res.status(400).json(validationError);
  }

  const newScope = new Scope({ name, shortCode });
  user.scopes.unshift(newScope);
  await user.save();

  res.json(newScope);
};

module.exports = createScope;
