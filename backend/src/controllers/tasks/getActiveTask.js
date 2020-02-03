const { Day } = require('../../models/Day');

/**
 * Gets the current active task info
 *
 * endpoint ➜ GET /api/tasks/active
 */
const getActiveTask = async (req, res) => {
  const activeTask = {
    taskId: '',
    sectionId: '',
    dayId: '',
    inBreak: false,
    title: '',
    time: 0,
    start: null,
  };

  const { userId } = req;

  const resultArray = await Day.getActiveTask(userId);

  if (resultArray.length > 0) {
    activeTask.taskId = resultArray[0].sections.tasks._id;
    activeTask.time = resultArray[0].sections.tasks.time;
    activeTask.start = resultArray[0].sections.tasks.start;
    activeTask.title = resultArray[0].sections.tasks.title;
    activeTask.sectionId = resultArray[0].sections._id;
    activeTask.dayId = resultArray[0]._id;
  }

  res.json({ message: '🥑', activeTask });
};

module.exports = getActiveTask;
