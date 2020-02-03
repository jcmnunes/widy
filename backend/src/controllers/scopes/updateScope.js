const Joi = require('joi');
const { User } = require('../../models/User');
const { validateScope } = require('../../helpers/validateScope');

const validate = body => {
  const schema = {
    id: Joi.objectId().required(),
    payload: Joi.object({
      name: Joi.string().required(),
      shortCode: Joi.string().required(),
    }).required(),
  };

  return Joi.validate(body, schema);
};

/**
 * Updates a scope
 *
 * endpoint ➜ PUT /api/scopes
 */
const updateScope = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: {
      id,
      payload: { name, shortCode },
    },
    userId,
  } = req;

  const user = await User.findById(userId);
  const { scopes, archivedScopes } = user;

  // Check if scope name and code already exists
  const validationError = validateScope({
    id,
    name,
    shortCode,
    scopes,
    archivedScopes,
    res,
  });

  if (validationError) {
    return res.status(400).json(validationError);
  }

  const scope = user.scopes.id(id);
  const archivedScope = user.archivedScopes.id(id);

  if (scope) {
    scope.set({ name, shortCode });
    await user.save();
    res.json(scope);
  }

  if (archivedScope) {
    archivedScope.set({ name, shortCode });
    await user.save();
    res.json(archivedScope);
  }

  res.status(404).json({ error: 'Scope not found ' });
};

module.exports = updateScope;
