const Joi = require('joi');
const moment = require('moment');
const { findTask } = require('../../helpers/findTask');

Joi.objectId = require('joi-objectid')(Joi);

const validate = params => {
  const schema = {
    taskId: Joi.objectId().required(),
    dayId: Joi.objectId().required(),
    sectionId: Joi.objectId().required(),
    time: Joi.number(),
  };

  return Joi.validate(params, schema);
};

/**
 * Stops a task
 *
 * endpoint ➜ PUT /api/tasks/stop/:id
 */
const stopTask = async (req, res) => {
  const taskId = req.params.id;

  const { error } = validate({ taskId, ...req.body });
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: { dayId, sectionId, time },
    userId,
  } = req;

  const { task, day } = await findTask({ userId, dayId, sectionId, taskId, res });

  const newTime = time || task.time + moment().diff(task.start, 'seconds');
  task.set({ start: null, time: newTime });

  await day.save();
  res.json({ message: '🥑', time: task.time });
};

module.exports = stopTask;
