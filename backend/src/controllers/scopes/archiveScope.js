const Joi = require('joi');
const { User } = require('../../models/User');

Joi.objectId = require('joi-objectid')(Joi);

const validate = body => {
  const schema = {
    id: Joi.objectId().required(),
  };

  return Joi.validate(body, schema);
};

/**
 * Archives a scope
 *
 * endpoint ➜ PUT /api/scopes/archive
 */
const archiveScope = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: { id },
    userId,
  } = req;

  const user = await User.findById(userId);

  const scope = user.scopes.id(id);

  if (!scope) return res.status(404).json({ error: 'Scope not found' });

  user.scopes.id(id).remove();
  user.archivedScopes.unshift(scope);
  await user.save();

  res.json(scope);
};

module.exports = archiveScope;
