import moment from 'moment';
import { queryCache } from 'react-query';
import { ActiveTaskDto, emptyActiveTask, useActiveTask } from './useActiveTask';
import { TaskDto } from './useDay';
import { useUpdateTask } from './useUpdateTask';

interface Params {
  dayId?: string;
  sectionId: string;
  task: Pick<TaskDto, 'id' | 'title' | 'time'>;
}

export const useToggleActiveTask = () => {
  const { data: activeTask } = useActiveTask();
  const [updateTask] = useUpdateTask();

  return ({ dayId, sectionId, task }: Params) => {
    if (!activeTask || !dayId) return;

    const {
      taskId: activeTaskId,
      start: activeTaskStart,
      time: activeTaskTime,
      dayId: activeTaskDayId,
      sectionId: activeTaskSectionId,
    } = activeTask;

    // There is an active task
    if (activeTaskId && activeTaskStart) {
      // There is an active task ➜ stop it
      updateTask({
        taskId: activeTaskId,
        body: {
          sectionId: activeTaskSectionId,
          dayId: activeTaskDayId,
          payload: {
            start: null,
            time: activeTaskTime + moment.utc().diff(activeTaskStart, 'seconds'),
          },
        },
      });

      // If "this" is not the active task ➜ start it
      if (activeTaskId !== task.id) {
        updateTask({
          taskId: task.id,
          body: {
            sectionId,
            dayId,
            payload: {
              start: moment.utc().toISOString(),
            },
          },
        });

        queryCache.setQueryData('activeTask', {
          time: task.time,
          title: task.title,
          taskId: task.id,
          sectionId,
          dayId,
          start: moment.utc().toISOString(),
        } as ActiveTaskDto);
      } else {
        queryCache.setQueryData('activeTask', emptyActiveTask);
      }
    } else {
      // Start the task
      const start = moment.utc().toISOString();

      updateTask({
        taskId: task.id,
        body: {
          sectionId,
          dayId,
          payload: {
            start,
          },
        },
      });

      queryCache.setQueryData('activeTask', {
        sectionId,
        dayId,
        taskId: task.id,
        start,
        title: task.title,
        time: task.time,
      } as ActiveTaskDto);
    }
  };
};
