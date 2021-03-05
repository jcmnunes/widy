import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import produce from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { DayDto, TaskDto } from './useDayQuery';
import { ActiveTaskDto, emptyActiveTask } from './useActiveTaskQuery';
import { ScheduleDto } from './useScheduleQuery';

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

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTask, {
    onMutate: async ({ taskId, body: { dayId, sectionId } }) => {
      await queryClient.cancelQueries(['day', dayId]);
      await queryClient.cancelQueries('activeTask');
      await queryClient.cancelQueries('schedule');

      const previousDay = queryClient.getQueryData(['day', dayId]);
      const previousActiveTask = queryClient.getQueryData<ActiveTaskDto>('activeTask');
      const previousSchedule = queryClient.getQueryData('schedule') as ScheduleDto;

      if (!previousDay || !previousActiveTask || !previousSchedule) {
        return;
      }

      // If the task is active ➜ stop it
      if (taskId === previousActiveTask.taskId) {
        queryClient.setQueryData('activeTask', emptyActiveTask);
      }

      if (sectionId === 'schedule') {
        queryClient.setQueryData<ScheduleDto | undefined>('schedule', currentSchedule => {
          if (currentSchedule) {
            const taskIndex = currentSchedule.tasks.findIndex(({ id }) => id === taskId);

            if (taskIndex > -1) {
              return produce(currentSchedule, draftState => {
                draftState.tasks.splice(taskIndex!, 1);
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
              return produce(currentDay, draftState => {
                draftState.sections[sectionIndex].tasks.splice(taskIndex!, 1);
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
        message: 'Task could not be deleted',
      });
    },

    onSettled: (result, err, { body: { dayId } }) => {
      queryClient.invalidateQueries(['day', dayId]);
      queryClient.invalidateQueries('activeTask');
      queryClient.invalidateQueries('schedule');
    },
  });
};
