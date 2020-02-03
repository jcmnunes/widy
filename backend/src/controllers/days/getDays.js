const { Day } = require('../../models/Day');

const MAX_DAYS = 100;

/**
 * Gets a list of days
 *
 * endpoint ➜ GET /api/days
 */
const getDays = async (req, res) => {
  const days = await Day.find({ belongsTo: req.userId })
    .select('day')
    .sort({ day: 'desc' })
    .limit(MAX_DAYS);
  res.json(days);
};

module.exports = getDays;
