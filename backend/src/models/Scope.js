const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const scopeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minLength: 1,
    maxLength: 255,
  },
  shortCode: {
    type: String,
    trim: true,
    required: true,
    minLength: 1,
    maxLength: 24,
  },
});

// The MongoDBErrorHandler plugin gives us a better 'unique' error
scopeSchema.plugin(mongodbErrorHandler);

const Scope = mongoose.model('Scope', scopeSchema);

exports.Scope = Scope;
exports.scopeSchema = scopeSchema;
