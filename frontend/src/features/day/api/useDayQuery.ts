import axios from 'axios';
import { useQuery } from 'react-query';
import { useMemo } from 'react';
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

export interface SectionDto {
  id: string;
  isPlan: boolean;
  title: string;
  tasks: TaskDto[];
}

export interface DayDto {
  id: string;
  day: string;
  sections: SectionDto[];
}

const getDayById = async (dayId?: string) => {
  const { data } = await axios.get<DayDto>(`/api/days/${dayId}`);
  return data;
};

export const useDayQuery = (dayId?: string) => {
  return useQuery(['day', dayId], () => getDayById(dayId), { enabled: !!dayId });
};

export const useSection = (dayId?: string, sectionId?: string): SectionDto | null => {
  const { data: day } = useDayQuery(dayId);

  return useMemo(() => {
    if (!day || !dayId || !sectionId) return null;

    return day.sections.find(({ id }) => id === sectionId) || null;
  }, [day, dayId, sectionId]);
};

export const useTask = (dayId?: string, sectionId?: string, taskId?: string): TaskDto | null => {
  const { data: day } = useDayQuery(dayId);
  const section = useSection(dayId, sectionId);

  return useMemo(() => {
    if (!day || !dayId || !sectionId || !taskId || !section) return null;

    return section.tasks.find(({ id }) => id === taskId) || null;
  }, [day, dayId, section, sectionId, taskId]);
};
