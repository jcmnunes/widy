import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import produce from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { DayDto, TaskDto } from './useDayQuery';
import { ScheduleDto } from './useScheduleQuery';

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

export const useScheduleTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(scheduleTask, {
    onMutate: ({ taskId, body: { dayId, sectionId } }) => {
      const previousDay = queryClient.getQueryData(['day', dayId]);
      const previousSchedule = queryClient.getQueryData('schedule');

      if (!previousDay || !previousSchedule) {
        return;
      }

      queryClient.setQueryData<DayDto | undefined>(['day', dayId], currentDay => {
        if (currentDay) {
          const sectionIndex = currentDay.sections.findIndex(({ id }) => id === sectionId);
          const taskIndex = currentDay.sections[sectionIndex]?.tasks.findIndex(
            ({ id }) => id === taskId,
          );

          if (sectionIndex > -1 && taskIndex > -1) {
            const task = currentDay.sections[sectionIndex].tasks[taskIndex];

            queryClient.setQueryData<ScheduleDto | undefined>('schedule', currentSchedule => {
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
        queryClient.setQueryData(['day', dayId], previousDay);
        queryClient.setQueryData('schedule', previousSchedule);
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

    onSettled: (result, err, { body: { dayId } }) => {
      queryClient.invalidateQueries(['day', dayId]);
      queryClient.invalidateQueries('schedule');
    },
  });
};
