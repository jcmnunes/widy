import { model, Schema, Model, Document } from 'mongoose';
import mongodbErrorHandler from 'mongoose-mongodb-errors';

export const taskSchema = new Schema(
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
      type: Schema.Types.ObjectId,
      default: null,
    },
  },
  /* gives us "createdAt" and "updatedAt" fields automatically */
  { timestamps: true },
);

// The MongoDBErrorHandler plugin gives us a better 'unique' error
taskSchema.plugin(mongodbErrorHandler);

export interface Task extends Document {
  title: string;
  notes: string | null;
  time: number;
  start: number | null;
  completed: boolean;
  scopeId: string | null;
}

export const TaskModel: Model<Task> = model<Task>('Task', taskSchema);
