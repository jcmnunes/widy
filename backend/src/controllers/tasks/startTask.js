const Joi = require('joi');
const moment = require('moment');
const { findTask } = require('../../helpers/findTask');

Joi.objectId = require('joi-objectid')(Joi);

const validate = params => {
  const schema = {
    taskId: Joi.objectId().required(),
    dayId: Joi.objectId().required(),
    sectionId: Joi.objectId().required(),
    start: Joi.date().required(),
  };

  return Joi.validate(params, schema);
};

/**
 * Starts a task
 *
 * endpoint ➜ PUT /api/tasks/start/:taskId
 */
const startTask = async (req, res) => {
  const taskId = req.params.id;

  const { error } = validate({ taskId, ...req.body });
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: { dayId, sectionId, start },
    userId,
  } = req;

  const { task, day } = await findTask({ userId, dayId, sectionId, taskId, res });

  task.set({ start: moment(start).toISOString() });

  await day.save();
  res.json({ message: '🥑' });
};

module.exports = startTask;
