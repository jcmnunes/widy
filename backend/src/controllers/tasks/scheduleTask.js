const Joi = require('joi');
const { User } = require('../../models/User');
const { findTask } = require('../../helpers/findTask');

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
 * Schedules a task
 *
 * endpoint ➜ POST /api/tasks/schedule
 */
const scheduleTask = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: { dayId, sectionId, taskId },
    userId,
  } = req;

  const { task, section, day } = await findTask({ userId, dayId, sectionId, taskId, res });

  if (task.time > 0) {
    return res.status(400).json({ error: 'Task has time logged already' });
  }
  if (task.completed) {
    return res.status(400).json({ error: 'Task is completed already' });
  }
  if (task.start) {
    return res.status(400).json({ error: 'Task is in progress' });
  }

  section.tasks.id(taskId).remove();

  const user = await User.findById(userId);
  user.schedule.push(task);

  await day.save();
  await user.save();
  res.json({ message: '🥑' });
};

module.exports = scheduleTask;
