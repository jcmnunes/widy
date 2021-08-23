import moment from 'moment';
import { DayModel } from '../models/Day';

interface StopActiveTaskParams {
  userId: string;
}

export const stopActiveTask = async ({ userId }: StopActiveTaskParams) => {
  const resultArray = await DayModel.getActiveTask(userId);

  if (resultArray.length > 0) {
    const {
      _id: dayId,
      sections: {
        _id: sectionId,
        tasks: { _id: taskId },
      },
    } = resultArray[0];

    if (!dayId || !sectionId || !taskId) {
      return;
    }

    const day = await DayModel.findOne({
      _id: dayId,
      belongsTo: userId,
    });

    if (!day) return;

    const section = day.sections.id(sectionId);

    if (!section) return;

    const task = section.tasks.id(taskId);

    if (!task) return;

    if (task.start) {
      const newTime = task.time + moment().diff(task.start, 'seconds');
      task.set({ start: null, time: newTime });
    }

    await day.save();
  }
};
