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
 * Unarchives a scope
 *
 * endpoint ➜ PUT /api/scopes/unarchive
 */
const unarchiveScope = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: { id },
    userId,
  } = req;

  const user = await User.findById(userId);

  const archivedScope = user.archivedScopes.id(id);

  if (!archivedScope) return res.status(404).json({ error: 'Scope not found' });

  user.archivedScopes.id(id).remove();
  user.scopes.unshift(archivedScope);
  await user.save();

  res.json(archivedScope);
};

module.exports = unarchiveScope;
