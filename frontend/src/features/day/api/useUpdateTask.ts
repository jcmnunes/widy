import axios from 'axios';
import { queryCache, useMutation } from 'react-query';
import produce from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { DayDto, TaskDto } from './useDay';
import { ScopeDto } from './useScopes';

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
      queryCache.cancelQueries(['days', dayId]);
      queryCache.cancelQueries('activeTask');

      const previousDay = queryCache.getQueryData(['days', dayId]);
      const scopes = queryCache.getQueryData('scopes') as ScopeDto[];

      queryCache.setQueryData<DayDto | undefined>(['days', dayId], currentDay => {
        if (currentDay) {
          const sectionIndex = currentDay.sections.findIndex(({ id }) => id === sectionId);
          const taskIndex = currentDay.sections[sectionIndex]?.tasks.findIndex(
            ({ id }) => id === taskId,
          );

          if (sectionIndex > -1 && taskIndex > -1) {
            const task = currentDay.sections[sectionIndex].tasks[taskIndex];

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

      return () => queryCache.setQueryData(['days', dayId], previousDay);
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
      queryCache.refetchQueries(['days', dayId]);
      queryCache.refetchQueries('activeTask');
    },
  });
};
