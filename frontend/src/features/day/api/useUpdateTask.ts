import axios from 'axios';
import { queryCache, useMutation } from 'react-query';
import produce from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { DayDto, TaskDto } from './useDay';
import { ScopeDto } from './useScopes';
import { ActiveTaskDto, emptyActiveTask } from './useActiveTask';
import { ScheduleDto } from './useSchedule';

interface UpdateTaskPayload {
  title: string;
  notes: string;
  time: number;
  start: string | null;
  completed: boolean;
  scope: string | null;
}

interface UpdateTaskBody {
  dayId: string;
  sectionId: string;
  payload: Partial<UpdateTaskPayload>;
}

export interface UpdateTaskVariables {
  taskId: string;
  body: UpdateTaskBody;
}

const updateTask = async ({ taskId, body }: UpdateTaskVariables) => {
  const { data } = await axios.put<TaskDto>(`/api/tasks/${taskId}`, body);
  return data;
};

export const useUpdateTask = () => {
  return useMutation(updateTask, {
    onMutate: ({ taskId, body: { dayId, sectionId, payload } }) => {
      queryCache.cancelQueries(['day', dayId]);
      queryCache.cancelQueries('activeTask');
      queryCache.cancelQueries('schedule');

      const previousDay = queryCache.getQueryData(['day', dayId]) as DayDto;
      const previousActiveTask = queryCache.getQueryData('activeTask') as ActiveTaskDto;
      const previousSchedule = queryCache.getQueryData('schedule') as ScheduleDto;

      const scopes = queryCache.getQueryData('scopes') as ScopeDto[];

      const isSchedule = sectionId === 'schedule';

      if (isSchedule) {
        queryCache.setQueryData<ScheduleDto | undefined>('schedule', currentSchedule => {
          if (currentSchedule) {
            const taskIndex = currentSchedule.tasks.findIndex(({ id }) => id === taskId);

            if (taskIndex > -1) {
              const task = currentSchedule.tasks[taskIndex];

              return produce(currentSchedule, draftState => {
                const scope =
                  // eslint-disable-next-line no-nested-ternary
                  payload.scope === undefined
                    ? task.scope
                    : payload.scope
                    ? scopes.find(({ id }) => id === payload.scope)
                    : null;

                draftState.tasks[taskIndex] = {
                  ...task,
                  ...payload,
                  scope: scope === undefined ? null : scope,
                };
              });
            }
          }

          return currentSchedule;
        });
      } else {
        queryCache.setQueryData<DayDto | undefined>(['day', dayId], currentDay => {
          if (currentDay) {
            const sectionIndex = currentDay.sections.findIndex(({ id }) => id === sectionId);
            const taskIndex = currentDay.sections[sectionIndex]?.tasks.findIndex(
              ({ id }) => id === taskId,
            );

            if (sectionIndex > -1 && taskIndex > -1) {
              const task = currentDay.sections[sectionIndex].tasks[taskIndex];

              // We are starting a task
              if (payload.start) {
                queryCache.setQueryData('activeTask', {
                  time: task.time,
                  title: task.title,
                  taskId: task.id,
                  sectionId,
                  dayId,
                  start: payload.start,
                } as ActiveTaskDto);
              }

              // We are stopping a task
              if (payload.time) {
                queryCache.setQueryData('activeTask', emptyActiveTask);
              }

              if (payload.title) {
                queryCache.setQueryData('activeTask', {
                  ...previousActiveTask,
                  title: payload.title,
                });
              }

              return produce(currentDay, draftState => {
                const scope =
                  // eslint-disable-next-line no-nested-ternary
                  payload.scope === undefined
                    ? task.scope
                    : payload.scope
                    ? scopes.find(({ id }) => id === payload.scope)
                    : null;

                draftState.sections[sectionIndex].tasks[taskIndex] = {
                  ...task,
                  ...payload,
                  scope: scope === undefined ? null : scope,
                };
              });
            }
          }

          return currentDay;
        });
      }

      return () => {
        queryCache.setQueryData(['day', dayId], previousDay);
        queryCache.setQueryData('activeTask', previousActiveTask);
        queryCache.setQueryData('schedule', previousSchedule);
      };
    },

    onError: (_, __, rollback) => {
      if (typeof rollback === 'function') {
        rollback();
      }

      Toaster.error({
        title: 'Oops, something went wrong',
        message: 'Task was not updated',
      });
    },

    onSettled: (result, err, { body: { dayId } }) => {
      queryCache.invalidateQueries(['day', dayId]);
      queryCache.invalidateQueries('activeTask');
      queryCache.invalidateQueries('schedule');
    },
  });
};
