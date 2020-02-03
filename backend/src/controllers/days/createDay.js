const Joi = require('joi');
const { Day } = require('../../models/Day');
const { Section } = require('../../models/Section');

const validate = dayData => {
  const schema = {
    day: Joi.date().iso(),
  };

  return Joi.validate(dayData, schema);
};

/**
 * Creates a new day
 *
 * endpoint ➜ POST /api/days
 */
const createDay = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { day } = req.body;
  const existingDaysArray = await Day.find({ day, belongsTo: req.userId });
  if (existingDaysArray.length > 0) {
    return res.status(400).json({ message: 'Day exists' });
  }
  const newDay = new Day({
    day,
    sections: [
      new Section({
        title: 'Plan',
        isPlan: true,
        tasks: [],
      }),
      new Section({
        title: 'In the morning',
        isPlan: false,
        tasks: [],
      }),
      new Section({
        title: 'In the afternoon',
        isPlan: false,
        tasks: [],
      }),
    ],
    belongsTo: req.userId,
  });
  const { _id, day: savedDay } = await newDay.save();
  res.json({ day: { id: _id, day: savedDay }, message: '🥑' });
};

module.exports = createDay;
