import { model, Schema, Model, Document, Types } from 'mongoose';
import mongodbErrorHandler from 'mongoose-mongodb-errors';
import { Task, taskSchema } from './Task';

export const scheduleSchema = new Schema({
  tasks: [taskSchema],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

// The MongoDBErrorHandler plugin gives us a better 'unique' error
scheduleSchema.plugin(mongodbErrorHandler);

export interface Schedule extends Document {
  tasks: Types.DocumentArray<Task>;
  owner: string;
}

export const ScheduleModel: Model<Schedule> = model<Schedule>('Schedule', scheduleSchema);
