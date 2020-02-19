import { model, Schema, Model, Document, Types } from 'mongoose';
import mongodbErrorHandler from 'mongoose-mongodb-errors';
import { sectionSchema, Section } from './Section';
import { Task } from './Task';

export const daySchema = new Schema(
  {
    day: {
      type: String,
      required: true,
    },
    sections: [sectionSchema],
    belongsTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  /* gives us "createdAt" and "updatedAt" fields automatically */
  { timestamps: true },
);

// The MongoDBErrorHandler plugin gives us a better 'unique' error
daySchema.plugin(mongodbErrorHandler);

daySchema.statics.getActiveTask = function(userId: string) {
  return this.aggregate([
    { $match: { belongsTo: Types.ObjectId(userId) } },
    { $unwind: '$sections' },
    { $unwind: '$sections.tasks' },
    { $match: { 'sections.tasks.start': { $ne: null } } },
  ]);
};

export interface Day extends Document {
  day: string;
  sections: Types.DocumentArray<Section>;
  belongsTo: string;
}

interface IDayModel extends Model<Day> {
  getActiveTask(
    userId: string,
  ): {
    _id: string;
    day: string;
    sections: {
      _id: string;
      tasks: Task;
    };
  }[];
}

export const DayModel: IDayModel = model<Day, IDayModel>('Day', daySchema);
