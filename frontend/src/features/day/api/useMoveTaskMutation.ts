import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { useMutation, useQueryClient } from 'react-query';
import produce from 'immer';
import arrayMove from 'array-move';
import cloneDeep from 'lodash/cloneDeep';
import { Toaster } from '@binarycapsule/ui-capsules';
import { DayDto } from './useDayQuery';
import { ActiveTaskDto, emptyActiveTask } from './useActiveTaskQuery';
import { arrayInsert, arrayRemove } from '../../helpers';
import { ScheduleDto } from './useScheduleQuery';
import { DayRouteParams } from '../dayTypes';

/**
 * Handle the unique drag states below
 *
 * 1. Move inside the Schedule
 *  - Update the Schedule cache
 *
 * 2. Move inside the same section (not schedule)
 *  - Update the Day cache by reordering tasks in the target Section
 *
 * 3. Move outside the Schedule
 *  - Update both Day and Schedule caches
 *
 * 4. Move to the Schedule (from other section)
 *  - Update both Schedule and Day
 *  - If we are moving the active task ➜ stop it ➜ update Active
 *
 * 5. Move to the Plan (not from schedule)
 *  - Update Day
 *  - If we are moving the active task ➜ stop it ➜ update Active
 *
 * 6. Move from the plan (not to schedule)
 *  - If we are staring a task ➜ update Active
 *  - Update Day
 *
 * 7. Move between work sections
 *  - Update Day
 */

interface MoveTaskBody {
  dayId: string;
  fromSectionId: string;
  toSectionId: string;
  fromIndex: number;
  toIndex: number | null;
  start?: string;
}

export interface MoveTaskVariables {
  taskId: string;
  previousSchedule?: ScheduleDto;
  body: MoveTaskBody;
}

const moveTask = async ({ taskId, body }: MoveTaskVariables) => {
  const { data } = await axios.put<{ message: string }>(`/api/tasks/${taskId}/move`, body);

  return data;
};

export const useMoveTaskMutation = () => {
  const history = useHistory();

  const { taskId: selectedTaskId } = useParams<DayRouteParams>();

  const queryClient = useQueryClient();

  return useMutation(moveTask, {
    onMutate: async ({ taskId, body }) => {
      const { dayId, start, fromSectionId, toSectionId, fromIndex, toIndex } = body;

      await queryClient.cancelQueries(['day', dayId]);
      await queryClient.cancelQueries('activeTask');
      await queryClient.cancelQueries('schedule');

      const previousDay = queryClient.getQueryData<DayDto>(['day', dayId]);
      const previousActiveTask = queryClient.getQueryData<ActiveTaskDto>('activeTask');
      const previousSchedule = queryClient.getQueryData<ScheduleDto>('schedule');

      if (!previousDay || !previousActiveTask || !previousSchedule) {
        return;
      }

      const fromSectionIndex = previousDay.sections.findIndex(({ id }) => id === fromSectionId);
      const toSectionIndex = previousDay.sections.findIndex(({ id }) => id === toSectionId);

      const toSection =
        toSectionId === 'schedule' ? previousSchedule : previousDay.sections[toSectionIndex];
      const fromSection =
        fromSectionId === 'schedule' ? previousSchedule : previousDay.sections[fromSectionIndex];

      const task = fromSection ? fromSection.tasks.find(({ id }) => id === taskId) : null;

      const toIndexMod = toIndex === null ? toSection.tasks.length : toIndex;

      const isFromThePlan =
        fromSectionIndex > -1 ? previousDay.sections[fromSectionIndex].isPlan : false;
      const isToThePlan = toSectionIndex > -1 ? previousDay.sections[toSectionIndex].isPlan : false;

      const isFromTheSchedule = fromSectionId === 'schedule';
      const isToTheSchedule = toSectionId === 'schedule';

      if (!task) {
        return;
      }

      const newTask = cloneDeep(task);

      // Move inside the Schedule
      if (isFromTheSchedule && isToTheSchedule) {
        queryClient.setQueryData<ScheduleDto | undefined>('schedule', schedule => {
          if (schedule) {
            const newScheduleTasks = arrayMove(schedule.tasks, fromIndex, toIndex!);

            return produce(schedule, draftState => {
              draftState.tasks = newScheduleTasks;
            });
          }

          return schedule;
        });
      }

      // Move inside the same section (not schedule)
      if (fromSectionId === toSectionId && !isFromTheSchedule) {
        const section = previousDay.sections[fromSectionIndex];

        const newSectionTasks = arrayMove(section.tasks, fromIndex, toIndex!);

        queryClient.setQueryData<DayDto | undefined>(['day', dayId], () => {
          return produce(previousDay, draftState => {
            draftState.sections[fromSectionIndex].tasks = newSectionTasks;
          });
        });
      }

      // Move outside the schedule
      if (isFromTheSchedule && !isToTheSchedule) {
        queryClient.setQueryData<ScheduleDto | undefined>('schedule', schedule => {
          if (schedule) {
            const newScheduleTasks = arrayRemove(schedule.tasks, fromIndex);

            return produce(schedule, draftState => {
              draftState.tasks = newScheduleTasks;
            });
          }

          return schedule;
        });

        queryClient.setQueryData(['day', dayId], () => {
          return produce(previousDay, draftState => {
            draftState.sections[toSectionIndex].tasks = arrayInsert(
              toSection.tasks,
              toIndexMod,
              newTask,
            );
          });
        });
      }

      // Move to the Schedule (from other section)
      if (isToTheSchedule && !isFromTheSchedule) {
        // If the draggable is the active task ➜ stop it
        if (previousActiveTask?.taskId === taskId) {
          queryClient.setQueryData('activeTask', emptyActiveTask);
        }

        newTask.completed = false;
        newTask.start = null;
        newTask.time = 0;

        queryClient.setQueryData<ScheduleDto | undefined>('schedule', schedule => {
          if (schedule) {
            return produce(schedule, draftState => {
              draftState.tasks = arrayInsert(schedule.tasks, toIndex!, newTask);
            });
          }

          return schedule;
        });

        queryClient.setQueryData(['day', dayId], () => {
          return produce(previousDay, draftState => {
            draftState.sections[fromSectionIndex].tasks = arrayRemove(fromSection.tasks, fromIndex);
          });
        });
      }

      // Move to the Plan (not from schedule)
      if (isToThePlan && !isFromThePlan && !isFromTheSchedule) {
        // If the draggable is the active task ➜ stop it
        if (previousActiveTask?.taskId === taskId) {
          queryClient.setQueryData('activeTask', emptyActiveTask);
        }

        newTask.completed = false;
        newTask.start = null;
        newTask.time = 0;

        queryClient.setQueryData(['day', dayId], () => {
          return produce(previousDay, draftState => {
            draftState.sections[fromSectionIndex].tasks = arrayRemove(fromSection.tasks, fromIndex);

            draftState.sections[toSectionIndex].tasks = arrayInsert(
              toSection.tasks,
              toIndexMod,
              newTask,
            );
          });
        });
      }

      // Move from the plan (not to schedule)
      if (isFromThePlan && !isToThePlan && !isToTheSchedule) {
        // We are launching a task
        if (start) {
          newTask.start = start;

          queryClient.setQueryData('activeTask', {
            time: newTask.time,
            title: newTask.title,
            taskId: newTask.id,
            sectionId: toSectionId,
            dayId,
            start,
          } as ActiveTaskDto);
        }

        queryClient.setQueryData(['day', dayId], () => {
          return produce(previousDay, draftState => {
            if (toSectionIndex > -1) {
              draftState.sections[toSectionIndex].tasks = arrayInsert(
                toSection.tasks,
                toIndexMod,
                newTask,
              );
            }

            if (fromSectionIndex > -1) {
              draftState.sections[fromSectionIndex].tasks = arrayRemove(
                fromSection.tasks,
                fromIndex,
              );
            }
          });
        });
      }

      // Move between work sections
      if (
        !isFromThePlan &&
        !isFromTheSchedule &&
        !isToThePlan &&
        !isToTheSchedule &&
        fromSectionId !== toSectionId
      ) {
        queryClient.setQueryData(['day', dayId], () => {
          return produce(previousDay, draftState => {
            if (toSectionIndex > -1) {
              draftState.sections[toSectionIndex].tasks = arrayInsert(
                toSection.tasks,
                toIndexMod,
                newTask,
              );
            }

            if (fromSectionIndex > -1) {
              draftState.sections[fromSectionIndex].tasks = arrayRemove(
                fromSection.tasks,
                fromIndex,
              );
            }
          });
        });
      }

      // We are moving the currently selected task ➜ update the URL
      if (selectedTaskId === taskId || start) {
        history.push(`/day/${body.dayId}/${body.toSectionId}/${taskId}`);
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
        message: 'Task was not moved',
      });
    },

    onSettled: (result, err, { body: { dayId } }) => {
      queryClient.invalidateQueries(['day', dayId]);
      queryClient.invalidateQueries('activeTask');
      queryClient.invalidateQueries('schedule');
    },
  });
};
