const Joi = require('joi');
const { findTask } = require('../../helpers/findTask');

Joi.objectId = require('joi-objectid')(Joi);

const validate = body => {
  const schema = {
    dayId: Joi.objectId().required(),
    sectionId: Joi.objectId().required(),
    payload: Joi.object().required(),
  };

  return Joi.validate(body, schema);
};

/**
 * Updates a task
 *
 * endpoint ➜ PUT /api/tasks/:id
 */
const updateTask = async (req, res) => {
  const taskId = req.params.id;

  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: { dayId, sectionId, payload },
    userId,
  } = req;

  const { task, day } = await findTask({ userId, dayId, sectionId, taskId, res });

  task.set(payload);

  await day.save();
  res.json({ message: '🥑' });
};

module.exports = updateTask;
