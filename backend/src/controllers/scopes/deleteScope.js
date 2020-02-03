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
 * Deletes a Scope
 *
 * endpoint ➜ DELETE /api/scopes
 */
const deleteScope = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: { id },
    userId,
  } = req;

  const user = await User.findById(userId);

  if (user.scopes.length === 0) {
    return res.status(400).json({ error: 'There are no scopes to delete' });
  }

  const scope = user.scopes.id(id);

  if (!scope) return res.status(404).json({ error: 'Scope not found' });

  scope.remove();
  await user.save();

  res.json({ message: '🥑' });
};

module.exports = deleteScope;
