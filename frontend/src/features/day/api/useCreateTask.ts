import axios from 'axios';
import { queryCache, useMutation } from 'react-query';
import produce from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { DayDto, TaskDto } from './useDay';
import { ScopeDto } from './useScopes';

interface CreateTaskDto {
  title: string;
  notes: string;
  time: number;
  start: string | null;
  completed: boolean;
  scope: string | null;
}

interface CreateTaskBody {
  dayId: string;
  sectionId: string;
  payload: Partial<CreateTaskDto>;
}

export interface CreateTaskVariables {
  dayId: string;
  sectionId: string;
  title: string;
  scope: ScopeDto | null;
}

const getNewTask = (title: string, scope: ScopeDto | null): Omit<TaskDto, 'id'> => ({
  title,
  time: 0,
  start: null,
  scope,
  notes: '',
  completed: false,
});

const createTask = async ({ dayId, sectionId, title, scope }: CreateTaskVariables) => {
  const body: CreateTaskBody = {
    dayId,
    sectionId,
    payload: {
      title,
      scope: scope ? scope.id : null,
    },
  };
  const { data } = await axios.post<TaskDto>('/api/tasks', body);
  return data;
};

export const useCreateTask = () => {
  return useMutation(createTask, {
    onMutate: ({ dayId, sectionId, title, scope }) => {
      queryCache.cancelQueries(['days', dayId]);
      queryCache.cancelQueries('activeTask');

      const previousDay = queryCache.getQueryData(['days', dayId]);

      queryCache.setQueryData<DayDto | undefined>(['days', dayId], currentDay => {
        if (currentDay) {
          const sectionIndex = currentDay.sections.findIndex(({ id }) => id === sectionId);

          if (sectionIndex > -1) {
            return produce(currentDay, draftState => {
              draftState.sections[sectionIndex].tasks.push({
                ...getNewTask(title, scope),
                id: `temp__${Date.now().toString()}`,
              });
            });
          }
        }

        return currentDay;
      });

      return () => queryCache.setQueryData(['days', dayId], previousDay);
    },

    onSuccess: (day, { dayId }) => {
      queryCache.setQueryData(['days', dayId], day);
    },

    onError: (err, newTodo, rollback) => {
      if (typeof rollback === 'function') {
        rollback();
      }

      Toaster.error({
        title: 'Oops, something went wrong',
        message: 'Task was not created',
      });
    },
  });
};
