import axios from 'axios';
import { queryCache, useMutation } from 'react-query';
import produce from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { DayDto, TaskDto } from './useDay';
import { ActiveTaskDto, emptyActiveTask } from './useActiveTask';
import { ScheduleDto } from './useSchedule';

interface DeleteTaskBody {
  dayId: string;
  sectionId: string;
}

export interface DeleteTaskVariables {
  taskId: string;
  body: DeleteTaskBody;
}

const deleteTask = async ({ taskId, body }: DeleteTaskVariables) => {
  const { data } = await axios.delete<TaskDto>(`/api/tasks/${taskId}`, { data: body });
  return data;
};

export const useDeleteTask = () => {
  return useMutation(deleteTask, {
    onMutate: ({ taskId, body: { dayId, sectionId } }) => {
      queryCache.cancelQueries(['day', dayId]);
      queryCache.cancelQueries('activeTask');
      queryCache.cancelQueries('schedule');

      const previousDay = queryCache.getQueryData(['day', dayId]);
      const previousActiveTask = queryCache.getQueryData<ActiveTaskDto>('activeTask');
      const previousSchedule = queryCache.getQueryData('schedule') as ScheduleDto;

      // If the task is active ➜ stop it
      if (previousActiveTask && taskId === previousActiveTask.taskId) {
        queryCache.setQueryData('activeTask', emptyActiveTask);
      }

      if (sectionId === 'schedule') {
        queryCache.setQueryData<ScheduleDto | undefined>('schedule', currentSchedule => {
          if (currentSchedule) {
            const taskIndex = currentSchedule.tasks.findIndex(({ id }) => id === taskId);

            if (taskIndex > -1) {
              return produce(currentSchedule, draftState => {
                draftState.tasks.splice(taskIndex!, 1);
              });
            }
          }

          return currentSchedule;
        });
      } else {
        queryCache.setQueryData<DayDto | undefined>(['day', dayId], currentDay => {
          if (currentDay) {
            const sectionIndex = currentDay.sections.findIndex(({ id }) => id === sectionId);
            const taskIndex = currentDay.sections[sectionIndex]?.tasks.findIndex(
              ({ id }) => id === taskId,
            );

            if (sectionIndex > -1 && taskIndex > -1) {
              return produce(currentDay, draftState => {
                draftState.sections[sectionIndex].tasks.splice(taskIndex!, 1);
              });
            }
          }

          return currentDay;
        });
      }

      return () => {
        queryCache.setQueryData(['day', dayId], previousDay);
        queryCache.setQueryData('activeTask', previousActiveTask);
        queryCache.setQueryData('schedule', previousSchedule);
      };
    },

    onError: (_, __, rollback) => {
      if (typeof rollback === 'function') {
        rollback();
      }

      Toaster.error({
        title: 'Oops, something went wrong',
        message: 'Task could not be deleted',
      });
    },

    onSettled: (result, err, { body: { dayId } }) => {
      queryCache.invalidateQueries(['day', dayId]);
      queryCache.invalidateQueries('activeTask');
      queryCache.invalidateQueries('schedule');
    },
  });
};
