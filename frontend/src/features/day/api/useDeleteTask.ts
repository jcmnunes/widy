import axios from 'axios';
import { queryCache, useMutation } from 'react-query';
import produce from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { DayDto, TaskDto } from './useDay';
import { ActiveTaskDto, emptyActiveTask } from './useActiveTask';

interface DeleteTaskBody {
  dayId: string;
  sectionId: string;
}

export interface DeleteTaskVariables {
  taskId: string;
  body: DeleteTaskBody;
}

const deleteTask = async ({ taskId, body }: DeleteTaskVariables) => {
  const { data } = await axios.delete<TaskDto>(`/api/tasks/${taskId}`, { data: body });
  return data;
};

export const useDeleteTask = () => {
  return useMutation(deleteTask, {
    onMutate: ({ taskId, body: { dayId, sectionId } }) => {
      queryCache.cancelQueries(['days', dayId]);
      queryCache.cancelQueries('activeTask');

      const previousDay = queryCache.getQueryData(['days', dayId]);
      const activeTask = queryCache.getQueryData<ActiveTaskDto>('activeTask');

      // If the task is active ➜ stop it
      if (activeTask && taskId === activeTask.taskId) {
        queryCache.setQueryData('activeTask', emptyActiveTask);
      }

      queryCache.setQueryData<DayDto | undefined>(['days', dayId], currentDay => {
        if (currentDay) {
          const sectionIndex = currentDay.sections.findIndex(({ id }) => id === sectionId);
          const taskIndex = currentDay.sections[sectionIndex]?.tasks.findIndex(
            ({ id }) => id === taskId,
          );

          if (sectionIndex > -1 && taskIndex > -1) {
            return produce(currentDay, draftState => {
              draftState.sections[sectionIndex].tasks.splice(taskIndex!, 1);
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
        message: 'Task could not be deleted',
      });
    },

    onSettled: (result, err, { body: { dayId } }) => {
      queryCache.refetchQueries(['days', dayId]);
      queryCache.refetchQueries('activeTask');
    },
  });
};
