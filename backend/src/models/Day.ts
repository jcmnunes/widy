import { model, Schema, Document, Types, PaginateModel } from 'mongoose';
import mongodbErrorHandler from 'mongoose-mongodb-errors';
import mongoosePaginate from 'mongoose-paginate-v2';
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
daySchema.plugin(mongoosePaginate);

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

// interface IDayModel extends Model<Day> {
interface IDayModel<T extends Document> extends PaginateModel<T> {
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

export const DayModel: IDayModel<Day> = model<Day, IDayModel<Day>>('Day', daySchema);
