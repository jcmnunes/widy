import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import produce from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { DayDto, TaskDto } from './useDayQuery';
import { ScopeDto } from './useScopesQuery';
import { ActiveTaskDto, emptyActiveTask } from './useActiveTaskQuery';
import { ScheduleDto } from './useScheduleQuery';

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

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTask, {
    onMutate: async ({ taskId, body: { dayId, sectionId, payload } }) => {
      await queryClient.cancelQueries(['day', dayId]);
      await queryClient.cancelQueries('activeTask');
      await queryClient.cancelQueries('schedule');

      const previousDay = queryClient.getQueryData(['day', dayId]) as DayDto;
      const previousActiveTask = queryClient.getQueryData('activeTask') as ActiveTaskDto;
      const previousSchedule = queryClient.getQueryData('schedule') as ScheduleDto;

      if (!previousDay || !previousActiveTask || !previousSchedule) {
        return;
      }

      const scopes = queryClient.getQueryData('scopes') as ScopeDto[];

      const isSchedule = sectionId === 'schedule';

      if (isSchedule) {
        queryClient.setQueryData<ScheduleDto | undefined>('schedule', currentSchedule => {
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
        queryClient.setQueryData<DayDto | undefined>(['day', dayId], currentDay => {
          if (currentDay) {
            const sectionIndex = currentDay.sections.findIndex(({ id }) => id === sectionId);
            const taskIndex = currentDay.sections[sectionIndex]?.tasks.findIndex(
              ({ id }) => id === taskId,
            );

            if (sectionIndex > -1 && taskIndex > -1) {
              const task = currentDay.sections[sectionIndex].tasks[taskIndex];

              // We are starting a task
              if (payload.start) {
                queryClient.setQueryData('activeTask', {
                  time: task.time,
                  title: task.title,
                  taskId: task.id,
                  sectionId,
                  dayId,
                  start: payload.start,
                } as ActiveTaskDto);
              }

              // We are editing task time
              if (payload.time) {
                // We are stopping the active task
                if (previousActiveTask.taskId === taskId) {
                  queryClient.setQueryData('activeTask', emptyActiveTask);
                }
              }

              if (payload.title) {
                queryClient.setQueryData('activeTask', {
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
        queryClient.setQueryData(['day', dayId], previousDay);
        queryClient.setQueryData('activeTask', previousActiveTask);
        queryClient.setQueryData('schedule', previousSchedule);
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
      queryClient.invalidateQueries(['day', dayId]);
      queryClient.invalidateQueries('activeTask');
      queryClient.invalidateQueries('schedule');
    },
  });
};
