import axios from 'axios';
import { queryCache, useMutation } from 'react-query';
import produce from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { DayDto } from './useDay';
import { ScheduleDto } from './useSchedule';

interface PlanAllBody {
  dayId: string;
}

export interface PlanAllVariables {
  body: PlanAllBody;
}

const planAll = async ({ body }: PlanAllVariables) => {
  const { data } = await axios.post<DayDto>('/api/schedule/planAll', body);
  return data;
};

export const usePlanAll = () => {
  return useMutation(planAll, {
    onMutate: ({ body: { dayId } }) => {
      const previousDay = queryCache.getQueryData<DayDto>(['day', dayId]);
      const previousSchedule = queryCache.getQueryData<ScheduleDto>('schedule');

      queryCache.setQueryData<DayDto | undefined>(['day', dayId], currentDay => {
        if (currentDay && previousSchedule) {
          const plan = currentDay.sections[0];

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

    onSettled: (result, err, { body: { dayId } }) => {
      queryCache.refetchQueries(['day', dayId]);
      queryCache.refetchQueries('schedule');
    },
  });
};
