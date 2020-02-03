const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const { taskSchema } = require('./Task');

const sectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isPlan: {
      type: Boolean,
      default: false,
    },
    tasks: [taskSchema],
  },
  /* gives us "createdAt" and "updatedAt" fields automatically */
  { timestamps: true },
);

// The MongoDBErrorHandler plugin gives us a better 'unique' error
sectionSchema.plugin(mongodbErrorHandler);

const Section = mongoose.model('Section', sectionSchema);

exports.Section = Section;
exports.sectionSchema = sectionSchema;
