import { model, Schema, Model, Document, Types } from 'mongoose';
import mongodbErrorHandler from 'mongoose-mongodb-errors';
import { Task, taskSchema } from './Task';

export const sectionSchema = new Schema(
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

export interface Section extends Document {
  title: string;
  isPlan: boolean;
  tasks: Types.DocumentArray<Task>;
}

export const SectionModel: Model<Section> = model<Section>('Section', sectionSchema);
