import axios from 'axios';
import { useMutation, queryCache } from 'react-query';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

interface CreateDayDto {
  message: string;
  day: {
    id: string;
    day: string;
  };
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
        history.push(`/day/${data.day.id}`);
      }
    },
    onSettled: () => queryCache.refetchQueries('days'),
  });
};
