import axios from 'axios';
import { queryCache, useMutation } from 'react-query';
import produce from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { DayDto, TaskDto } from './useDay';

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
      const previousDay = queryCache.getQueryData(['days', dayId]);

      queryCache.setQueryData<DayDto | undefined>(['days', dayId], currentDay => {
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

      return () => queryCache.setQueryData(['days', dayId], previousDay);
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

    onSettled: (result, err, { body: { dayId } }) => queryCache.refetchQueries(['days', dayId]),
  });
};
