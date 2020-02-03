const Joi = require('joi');
const { Day } = require('../../models/Day');

Joi.objectId = require('joi-objectid')(Joi);

const validate = body => {
  const schema = {
    dayId: Joi.objectId().required(),
    sectionId: Joi.objectId().required(),
    taskId: Joi.objectId().required(),
  };

  return Joi.validate(body, schema);
};

/**
 * Updates a task
 *
 * endpoint ➜ DELETE /api/tasks/:id
 */
const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const { error } = validate({ ...req.body, taskId });
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

  section.tasks.id(taskId).remove();

  await day.save();
  res.json({ message: '🥑' });
};

module.exports = deleteTask;
