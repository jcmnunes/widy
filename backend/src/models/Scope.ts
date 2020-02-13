import { model, Schema, Model, Document } from 'mongoose';
import mongodbErrorHandler from 'mongoose-mongodb-errors';

export const scopeSchema = new Schema({
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

export interface Scope extends Document {
  name: string;
  shortCode: string;
}

export const ScopeModel: Model<Scope> = model<Scope>('Scope', scopeSchema);
