const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const { sectionSchema } = require('./Section');

const daySchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
    },
    sections: [sectionSchema],
    belongsTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  /* gives us "createdAt" and "updatedAt" fields automatically */
  { timestamps: true },
);

// The MongoDBErrorHandler plugin gives us a better 'unique' error
daySchema.plugin(mongodbErrorHandler);

daySchema.statics.getActiveTask = function(userId) {
  return this.aggregate([
    { $match: { belongsTo: mongoose.Types.ObjectId(userId) } },
    { $unwind: '$sections' },
    { $unwind: '$sections.tasks' },
    { $match: { 'sections.tasks.start': { $ne: null } } },
  ]);
};

const Day = mongoose.model('Day', daySchema);

exports.Day = Day;
