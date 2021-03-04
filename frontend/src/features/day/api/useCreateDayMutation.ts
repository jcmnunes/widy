import axios from 'axios';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { produce } from 'immer';
import { GetDaysDto } from '../../daysNav/api/useDaysQuery';
import { ScheduleDto } from './useScheduleQuery';
import { Toaster } from '@binarycapsule/ui-capsules';

interface CreateDayDto {
  id: string;
  day: string;
}

const createDay = async () => {
  const { data } = await axios.post<CreateDayDto>('/api/days', {
    day: moment().format('YYYY-MM-DD'),
  });

  return data;
};

export const useCreateDayMutation = () => {
  const history = useHistory();

  const queryClient = useQueryClient();

  return useMutation(createDay, {
    onSuccess: data => {
      if (data && data.day) {
        queryClient.setQueryData<InfiniteData<GetDaysDto> | undefined>('days', currentDaysCache => {
          if (currentDaysCache) {
            return produce(currentDaysCache, draftState => {
              draftState.pages[0].days.unshift(data);
            });
          }

          return currentDaysCache;
        });

        queryClient.setQueryData<ScheduleDto | undefined>('schedule', schedule => {
          if (schedule) {
            return produce(schedule, draftState => {
              draftState.tasks = [];
            });
          }

          return schedule;
        });

        history.push(`/day/${data.id}`);
      }
    },

    onError: () => {
      Toaster.error({
        title: 'Oops, something went wrong',
      });
    },
  });
};
