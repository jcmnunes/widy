const Joi = require('joi');
const { Day } = require('../../models/Day');
const { User } = require('../../models/User');

Joi.objectId = require('joi-objectid')(Joi);

const validate = params => {
  const schema = {
    dayId: Joi.objectId().required(),
  };

  return Joi.validate(params, schema);
};

/**
 * Gets report data
 *
 * endpoint ➜ GET /api/report
 */
const getReport = async (req, res) => {
  const { error } = validate(req.params);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const day = await Day.findOne({
    _id: req.params.dayId,
    belongsTo: req.userId,
  });
  if (!day) return res.status(404).json({ error: 'Day not found' });

  const user = await User.findById(req.userId);

  const tasks = day.sections.reduce((acc, section) => {
    const { tasks, _id: sectionId, title, isPlan } = section;
    return [
      ...acc,
      ...tasks.map(({ _id: id, title: taskTitle, time, scopeId, completed }) => ({
        id,
        title: taskTitle,
        time,
        completed,
        scope: user.scopes.id(scopeId) || user.archivedScopes.id(scopeId) || null,
        section: { id: sectionId, title, isPlan },
      })),
    ];
  }, []);
  const totalTime = tasks.reduce((acc, { time }) => acc + time, 0);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  res.json({
    dayId: day._id,
    day: day.day,
    totalTime,
    totalTasks,
    completedTasks,
    tasks,
  });
};

module.exports = getReport;
