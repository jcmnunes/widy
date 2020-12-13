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

const getDays = async (_: string, page = 1) => {
  const { data } = await axios.get(`/api/days?page=${page}`);
  return data;
};

export const useDays = () => {
  const queryInfo = useInfiniteQuery<GetDaysDto, string>('days', getDays, {
    getFetchMore: lastPage => lastPage.nextPage || false,
  });

  const days = extractDays(queryInfo.data);

  return { ...queryInfo, days };
};

export const extractDays = (data?: GetDaysDto[]): DayDto[] => {
  if (!data) return [];

  const nestedDays = data.map(({ days }) => days);

  return nestedDays.flat();
};
