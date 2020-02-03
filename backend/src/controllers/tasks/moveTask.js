const Joi = require('joi');
const { Day } = require('../../models/Day');
const { move, remove, insert } = require('../../helpers/arrayHelpers');

Joi.objectId = require('joi-objectid')(Joi);

const validate = body => {
  const schema = {
    taskId: Joi.objectId().required(),
    dayId: Joi.objectId().required(),
    fromSectionId: Joi.objectId().required(),
    toSectionId: Joi.objectId().required(),
    fromIndex: Joi.number().required(),
    toIndex: Joi.number()
      .required()
      .allow(null),
  };

  return Joi.validate(body, schema);
};

/**
 * Moves a task
 *
 * endpoint ➜ PUT /api/tasks/move
 */
const moveTask = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    body: { taskId, dayId, fromSectionId, toSectionId, fromIndex, toIndex },
    userId,
  } = req;

  const day = await Day.findOne({
    _id: dayId,
    belongsTo: userId,
  });
  if (!day) return res.status(404).json({ error: 'Day not found' });

  const fromSection = day.sections.id(fromSectionId);
  if (!fromSection) return res.status(404).json({ error: 'Source Section not found' });

  const toSection = day.sections.id(toSectionId);
  if (!toSection) return res.status(404).json({ error: 'Destination Section not found' });

  const task = fromSection.tasks.id(taskId);
  if (!task) return res.status(404).json({ error: 'No task found' });

  if (fromSectionId === toSectionId) {
    fromSection.tasks = move(fromSection.tasks, fromIndex, toIndex);
  } else {
    // Moving a task to the plan resets the time to zero
    if (toSection.isPlan) {
      task.time = 0;
      task.start = null;
    }
    fromSection.tasks = remove(fromSection.tasks, fromIndex);

    // If toIndex is not specified ➜ append the task
    if (toIndex === null) {
      toSection.tasks = [...toSection.tasks, task];
    } else {
      toSection.tasks = insert(toSection.tasks, toIndex, task);
    }
  }

  await day.save();
  res.json({ message: '🥑' });
};

module.exports = moveTask;
