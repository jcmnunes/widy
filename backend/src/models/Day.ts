import { model, Schema, Document, Types, PaginateModel } from 'mongoose';
import mongodbErrorHandler from 'mongoose-mongodb-errors';
import mongoosePaginate from 'mongoose-paginate-v2';
import { sectionSchema, Section } from './Section';
import { Task } from './Task';

interface ReportTask {
  id: string;
  title: string;
  time: number;
  completed: boolean;
  scope?: { name: string; shortCode: string };
  section: {
    id: string;
    title: string;
    isPlan: boolean;
  };
}

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
  { timestamps: true },
);

// The MongoDBErrorHandler plugin gives us a better 'unique' error
daySchema.plugin(mongodbErrorHandler);
daySchema.plugin(mongoosePaginate);

daySchema.statics.getActiveTask = function (userId: string) {
  return this.aggregate([
    { $match: { belongsTo: Types.ObjectId(userId) } },
    { $unwind: '$sections' },
    { $unwind: '$sections.tasks' },
    { $match: { 'sections.tasks.start': { $ne: null } } },
  ]);
};

daySchema.statics.getReportTasks = function (id: string, userId: string): ReportTask[] {
  return this.aggregate([
    { $match: { belongsTo: Types.ObjectId(userId), _id: Types.ObjectId(id) } },
    { $unwind: '$sections' },
    { $unwind: '$sections.tasks' },
    {
      $lookup: {
        from: 'scopes',
        localField: 'sections.tasks.scope',
        foreignField: '_id',
        as: 'sections.tasks.scope',
      },
    },
    {
      $project: {
        _id: 0,
        id: '$sections.tasks._id',
        scope: { $arrayElemAt: ['$sections.tasks.scope', 0] },
        title: '$sections.tasks.title',
        time: '$sections.tasks.time',
        completed: '$sections.tasks.completed',
        'section.id': '$sections._id',
        'section.title': '$sections.title',
        'section.isPlan': '$sections.isPlan',
      },
    },
  ]);
};

export interface Day extends Document {
  day: string;
  sections: Types.DocumentArray<Section>;
  belongsTo: string;
}

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
  getReportTasks(id: string, userId: string): ReportTask[];
}

export const DayModel: IDayModel<Day> = model<Day, IDayModel<Day>>('Day', daySchema);
