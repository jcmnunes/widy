const Joi = require('joi');
const moment = require('moment');
const { Day } = require('../../models/Day');

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
  const { error } = validate({ taskId: req.params.id, ...req.body });
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: { dayId, sectionId, time },
    userId,
  } = req;

  const day = await Day.findOne({
    _id: dayId,
    belongsTo: userId,
  });
  if (!day) return res.status(404).json({ error: 'Day not found' });

  const section = day.sections.id(sectionId);
  if (!section) return res.status(404).json({ error: 'Section not found' });

  const task = section.tasks.id(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const newTime = time || task.time + moment().diff(task.start, 'seconds');
  task.set({ start: null, time: newTime });

  await day.save();
  res.json({ message: '🥑', time: task.time });
};

module.exports = stopTask;
