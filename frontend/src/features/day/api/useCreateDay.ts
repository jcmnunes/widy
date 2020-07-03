import axios from 'axios';
import { useMutation, queryCache } from 'react-query';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { produce } from 'immer';
import { GetDaysDto } from '../../daysNav/api/useDays';
import { ScheduleDto } from './useSchedule';

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

export const useCreateDay = () => {
  const history = useHistory();
  return useMutation(createDay, {
    onSuccess: data => {
      if (data && data.day) {
        queryCache.setQueryData<GetDaysDto[] | undefined>('days', currentDaysCache => {
          if (currentDaysCache) {
            return produce(currentDaysCache, draftState => {
              draftState[0].days.unshift(data);
            });
          }

          return currentDaysCache;
        });

        queryCache.setQueryData<ScheduleDto | undefined>('schedule', schedule => {
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
  });
};
