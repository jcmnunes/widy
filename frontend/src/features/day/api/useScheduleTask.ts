import axios from 'axios';
import { queryCache, useMutation } from 'react-query';
import produce from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { DayDto, TaskDto } from './useDay';
import { ScheduleDto } from './useSchedule';

interface ScheduleTaskBody {
  dayId: string;
  sectionId: string;
}

export interface ScheduleTaskVariables {
  taskId: string;
  body: ScheduleTaskBody;
}

const scheduleTask = async ({ taskId, body }: ScheduleTaskVariables) => {
  const { data } = await axios.post<TaskDto>(`/api/tasks/${taskId}/schedule`, body);
  return data;
};

export const useScheduleTask = () => {
  return useMutation(scheduleTask, {
    onMutate: ({ taskId, body: { dayId, sectionId } }) => {
      const previousDay = queryCache.getQueryData(['day', dayId]);
      const previousSchedule = queryCache.getQueryData('schedule');

      queryCache.setQueryData<DayDto | undefined>(['day', dayId], currentDay => {
        if (currentDay) {
          const sectionIndex = currentDay.sections.findIndex(({ id }) => id === sectionId);
          const taskIndex = currentDay.sections[sectionIndex]?.tasks.findIndex(
            ({ id }) => id === taskId,
          );

          if (sectionIndex > -1 && taskIndex > -1) {
            const task = currentDay.sections[sectionIndex].tasks[taskIndex];

            queryCache.setQueryData<ScheduleDto | undefined>('schedule', currentSchedule => {
              if (currentSchedule) {
                return produce(currentSchedule, draftState => {
                  draftState.tasks.push(task);
                });
              }

              return currentSchedule;
            });

            return produce(currentDay, draftState => {
              draftState.sections[sectionIndex].tasks.splice(taskIndex!, 1);
            });
          }
        }

        return currentDay;
      });

      return () => {
        queryCache.setQueryData(['day', dayId], previousDay);
        queryCache.setQueryData('schedule', previousSchedule);
      };
    },

    onError: (_, __, rollback) => {
      if (typeof rollback === 'function') {
        rollback();
      }

      Toaster.error({
        title: 'Oops, something went wrong',
        message: 'Task could not be scheduled',
      });
    },

    // onSettled: (result, err, { body: { dayId } }) => {
    //   queryCache.invalidateQueries(['day', dayId]);
    //   queryCache.invalidateQueries('schedule');
    // },
  });
};
