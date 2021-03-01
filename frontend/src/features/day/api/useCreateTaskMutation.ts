import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import produce from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { DayDto, TaskDto } from './useDayQuery';
import { ScopeDto } from './useScopesQuery';
import { ScheduleDto } from './useScheduleQuery';

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
  const { data } = await axios.post<{ day: DayDto; schedule: ScheduleDto }>('/api/tasks', body);
  return data;
};

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(createTask, {
    onMutate: async ({ dayId, sectionId, title, scope }) => {
      await queryClient.cancelQueries(['day', dayId]);
      await queryClient.cancelQueries('activeTask');
      await queryClient.cancelQueries('schedule');

      const previousDay = queryClient.getQueryData(['day', dayId]);
      const previousActiveTask = queryClient.getQueryData('activeTask');
      const previousSchedule = queryClient.getQueryData('schedule');

      if (!previousDay || !previousActiveTask || !previousSchedule) {
        return;
      }

      const isSchedule = sectionId === 'schedule';

      if (isSchedule) {
        queryClient.setQueryData<ScheduleDto | undefined>('schedule', currentSchedule => {
          if (currentSchedule) {
            return produce(currentSchedule, draftState => {
              draftState.tasks.push({
                ...getNewTask(title, scope),
                id: `temp__${Date.now().toString()}`,
              });
            });
          }

          return currentSchedule;
        });
      } else {
        queryClient.setQueryData<DayDto | undefined>(['day', dayId], currentDay => {
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
      }

      return () => {
        queryClient.setQueryData(['day', dayId], previousDay);
        queryClient.setQueryData('activeTask', previousActiveTask);
        queryClient.setQueryData('schedule', previousSchedule);
      };
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

    onSettled: (result, err, { dayId }) => {
      queryClient.invalidateQueries(['day', dayId]);
      queryClient.invalidateQueries('activeTask');
      queryClient.invalidateQueries('schedule');
    },
  });
};
