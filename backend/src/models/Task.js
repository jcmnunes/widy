const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 500,
    },
    notes: {
      type: {}, // Setting String in here throws an error... This is a JSON string.
    },
    time: {
      type: Number,
    },
    start: {
      type: Date,
      default: null,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    scopeId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  /* gives us "createdAt" and "updatedAt" fields automatically */
  { timestamps: true },
);

// The MongoDBErrorHandler plugin gives us a better 'unique' error
taskSchema.plugin(mongodbErrorHandler);

const Task = mongoose.model('Task', taskSchema);

exports.Task = Task;
exports.taskSchema = taskSchema;
