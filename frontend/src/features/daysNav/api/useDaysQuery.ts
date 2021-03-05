import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

export interface DayDto {
  id: string;
  day: string;
}

export interface GetDaysDto {
  days: DayDto[];
  nextPage: number | null;
}

const getDays = async (page = 1) => {
  const { data } = await axios.get(`/api/days?page=${page}`);

  return data;
};

export const useDaysQuery = () => {
  return useInfiniteQuery<GetDaysDto, Error>('days', ({ pageParam }) => getDays(pageParam), {
    getNextPageParam: lastPage => lastPage.nextPage || false,
  });
};
