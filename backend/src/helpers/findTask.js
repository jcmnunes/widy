const { Day } = require('../models/Day');

exports.findTask = async ({ userId, dayId, sectionId, taskId, res }) => {
  const day = await Day.findOne({ _id: dayId, belongsTo: userId });
  if (!day) return res.status(404).json({ error: 'Day not found' });

  const section = day.sections.id(sectionId);
  if (!section) return res.status(404).json({ error: 'Section not found' });

  const task = section.tasks.id(taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  return { task, section, day };
};
