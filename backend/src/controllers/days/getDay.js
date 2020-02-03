const Joi = require('joi');
const { Day } = require('../../models/Day');

Joi.objectId = require('joi-objectid')(Joi);

const validate = params => {
  const schema = {
    id: Joi.objectId().required(),
  };

  return Joi.validate(params, schema);
};

/**
 * Gets a day by Id
 *
 * endpoint ➜ GET /api/days/:id
 */
const getDay = async (req, res) => {
  const { error } = validate(req.params);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const day = await Day.findOne({
    _id: req.params.id,
    belongsTo: req.userId,
  });
  if (!day) return res.status(404).json({ error: 'Day not found' });

  res.send(day);
};

module.exports = getDay;
