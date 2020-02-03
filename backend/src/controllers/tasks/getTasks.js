const Joi = require('joi');
const { Day } = require('../../models/Day');

Joi.objectId = require('joi-objectid')(Joi);

const validate = body => {
  const schema = {
    dayId: Joi.objectId().required(),
    sectionId: Joi.objectId().required(),
  };

  return Joi.validate(body, schema);
};

/**
 * Gets list of tasks
 *
 * endpoint ➜ GET /api/tasks
 */
const getTasks = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: { dayId, sectionId },
    userId,
  } = req;

  const day = await Day.findOne({
    _id: dayId,
    belongsTo: userId,
  });
  if (!day) return res.status(404).json({ error: 'Day not found' });

  const section = day.sections.id(sectionId);
  if (!section) return res.status(404).json({ error: 'Section not found' });

  res.json(section.tasks);
};

module.exports = getTasks;
