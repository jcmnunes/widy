import axios from 'axios';
import { useQuery } from 'react-query';
import { ScopeDto } from './useScopesQuery';

export interface TaskDto {
  id: string;
  title: string;
  scope: ScopeDto | null;
  start: string | null;
  completed: boolean;
  notes: string;
  time: number;
}

export interface ScheduleDto {
  id: string;
  tasks: TaskDto[];
}

const getSchedule = async () => {
  const { data } = await axios.get<ScheduleDto>(`/api/schedule`);

  return data;
};

export const useScheduleQuery = () => {
  return useQuery('schedule', getSchedule);
};
