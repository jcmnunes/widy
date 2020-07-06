import axios from 'axios';
import { queryCache, useMutation } from 'react-query';
import produce from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { DayDto } from './useDay';
import { ScheduleDto } from './useSchedule';

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

export const useMoveAll = () => {
  return useMutation(moveAll, {
    onMutate: ({ to, body: { dayId } }) => {
      const previousDay = queryCache.getQueryData<DayDto>(['day', dayId]);
      const previousSchedule = queryCache.getQueryData<ScheduleDto>('schedule');

      queryCache.setQueryData<DayDto | undefined>(['day', dayId], currentDay => {
        if (currentDay && previousSchedule) {
          const plan = currentDay.sections[0];

          if (to === 'plan') {
            queryCache.setQueryData<ScheduleDto | undefined>('schedule', currentSchedule => {
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
            queryCache.setQueryData<ScheduleDto | undefined>('schedule', currentSchedule => {
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
        message: 'Tasks could not be moved',
      });
    },

    // onSettled: (result, err, { body: { dayId } }) => {
    //   queryCache.invalidateQueries(['day', dayId]);
    //   queryCache.invalidateQueries('schedule');
    // },
  });
};
