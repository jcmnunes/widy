import axios from 'axios';
import { useQuery } from 'react-query';

export interface ActiveTaskDto {
  taskId: string;
  sectionId: string;
  dayId: string;
  title: string;
  time: number;
  start: string | null;
}

export const emptyActiveTask: ActiveTaskDto = {
  taskId: '',
  sectionId: '',
  dayId: '',
  title: '',
  time: -1,
  start: null,
};

const getActiveTask = async () => {
  const { data } = await axios.get<ActiveTaskDto>('/api/tasks/active');
  return data;
};

export const useActiveTask = () => {
  return useQuery('activeTask', getActiveTask);
};
