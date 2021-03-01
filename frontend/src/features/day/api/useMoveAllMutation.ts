import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import produce from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { DayDto } from './useDayQuery';
import { ScheduleDto } from './useScheduleQuery';

interface MoveAllBody {
  dayId: string;
}

export interface MoveAllVariables {
  to: 'plan' | 'schedule';
  body: MoveAllBody;
}

const moveAll = async ({ to, body }: MoveAllVariables) => {
  const { data } = await axios.post<DayDto>(`/api/schedule/move/${to}`, body);
  return data;
};

export const useMoveAllMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(moveAll, {
    onMutate: async ({ to, body: { dayId } }) => {
      await queryClient.cancelQueries(['day', dayId]);
      await queryClient.cancelQueries('schedule');

      const previousDay = queryClient.getQueryData<DayDto>(['day', dayId]);
      const previousSchedule = queryClient.getQueryData<ScheduleDto>('schedule');

      if (!previousDay || !previousSchedule) {
        return;
      }

      queryClient.setQueryData<DayDto | undefined>(['day', dayId], currentDay => {
        if (currentDay && previousSchedule) {
          const plan = currentDay.sections[0];

          if (to === 'plan') {
            queryClient.setQueryData<ScheduleDto | undefined>('schedule', currentSchedule => {
              if (currentSchedule) {
                return produce(currentSchedule, draftState => {
                  draftState.tasks = [];
                });
              }

              return currentSchedule;
            });

            return produce(currentDay, draftState => {
              draftState.sections[0].tasks = [...plan.tasks, ...previousSchedule.tasks];
            });
          }

          if (to === 'schedule') {
            queryClient.setQueryData<ScheduleDto | undefined>('schedule', currentSchedule => {
              if (currentSchedule) {
                return produce(currentSchedule, draftState => {
                  draftState.tasks = [...previousSchedule.tasks, ...plan.tasks];
                });
              }

              return currentSchedule;
            });

            return produce(currentDay, draftState => {
              draftState.sections[0].tasks = [];
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
        message: 'Tasks could not be moved',
      });
    },

    onSettled: (_, __, { body: { dayId } }) => {
      queryClient.invalidateQueries(['day', dayId]);
      queryClient.invalidateQueries('schedule');
    },
  });
};
