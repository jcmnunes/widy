import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { queryCache, useMutation } from 'react-query';
import produce from 'immer';
import arrayMove from 'array-move';
import cloneDeep from 'lodash/cloneDeep';
import { Toaster } from '@binarycapsule/ui-capsules';
import { DayDto } from './useDay';
import { ActiveTaskDto, emptyActiveTask } from './useActiveTask';
import { arrayInsert, arrayRemove } from '../../helpers';
import { ScheduleDto } from './useSchedule';

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

interface UpdateCacheParams extends MoveTaskVariables {
  day: DayDto | undefined;
  activeTaskId?: string;
}

const updateCache = ({
  day,
  taskId,
  previousSchedule,
  activeTaskId,
  body: { fromSectionId, toSectionId, fromIndex, toIndex, start, dayId },
}: UpdateCacheParams) => {
  if (fromSectionId === 'schedule' && toSectionId === 'schedule') {
    queryCache.setQueryData<ScheduleDto | undefined>('schedule', schedule => {
      if (schedule) {
        const newScheduleTasks = arrayMove(schedule.tasks, fromIndex, toIndex!);

        return produce(schedule, draftState => {
          draftState.tasks = newScheduleTasks;
        });
      }

      return schedule;
    });

    return day;
  }

  if (day) {
    const fromSectionIndex = day.sections.findIndex(({ id }) => id === fromSectionId);
    const toSectionIndex = day.sections.findIndex(({ id }) => id === toSectionId);

    // Drag inside the same section
    if (fromSectionId === toSectionId) {
      const section = day.sections[fromSectionIndex];

      const newSectionTasks = arrayMove(section.tasks, fromIndex, toIndex!);

      return produce(day, draftState => {
        draftState.sections[fromSectionIndex].tasks = newSectionTasks;
      });
    }

    const toSection = toSectionId === 'schedule' ? previousSchedule : day.sections[toSectionIndex];
    const fromSection =
      fromSectionId === 'schedule' ? previousSchedule : day.sections[fromSectionIndex];
    const task = fromSection ? fromSection.tasks.find(({ id }) => id === taskId) : null;

    if (!task) return day;

    const newTask = cloneDeep(task);

    // Drag to the Plan or Schedule
    if (day.sections[toSectionIndex]?.isPlan || toSectionId === 'schedule') {
      // If the draggable is the active task ➜ stop it
      if (activeTaskId === taskId) {
        queryCache.setQueryData('activeTask', emptyActiveTask);
      }

      newTask.completed = false;
      newTask.start = null;
      newTask.time = 0;
    }

    if (toSectionId === 'schedule') {
      queryCache.setQueryData<ScheduleDto | undefined>('schedule', schedule => {
        if (schedule) {
          const newScheduleTasks = arrayInsert(schedule.tasks, toIndex!, newTask);

          return produce(schedule, draftState => {
            draftState.tasks = newScheduleTasks;
          });
        }

        return schedule;
      });
    }

    if (fromSectionId === 'schedule') {
      queryCache.setQueryData<ScheduleDto | undefined>('schedule', schedule => {
        if (schedule) {
          const newScheduleTasks = arrayRemove(schedule.tasks, fromIndex);

          return produce(schedule, draftState => {
            draftState.tasks = newScheduleTasks;
          });
        }

        return schedule;
      });
    }

    // We are launching a task
    if (start) {
      newTask.start = start;

      queryCache.setQueryData('activeTask', {
        time: newTask.time,
        title: newTask.title,
        taskId: newTask.id,
        sectionId: toSectionId,
        dayId,
        start,
      } as ActiveTaskDto);
    }

    let toIndexMod: number;
    if (toSection) {
      toIndexMod = toIndex === null ? toSection.tasks.length : toIndex;
    } else {
      return day;
    }

    if (!fromSection) {
      return day;
    }

    return produce(day, draftState => {
      if (toSectionIndex > -1) {
        draftState.sections[toSectionIndex].tasks = arrayInsert(
          toSection.tasks,
          toIndexMod,
          newTask,
        );
      }

      if (fromSectionIndex > -1) {
        draftState.sections[fromSectionIndex].tasks = arrayRemove(fromSection.tasks, fromIndex);
      }
    });
  }

  return day;
};

export const useMoveTask = () => {
  const history = useHistory();
  const { taskId: selectedTaskId } = useParams();

  return useMutation(moveTask, {
    onMutate: ({ taskId, body }) => {
      const { dayId, start } = body;

      queryCache.cancelQueries(['day', dayId]);
      queryCache.cancelQueries('activeTask');
      queryCache.cancelQueries('schedule');

      const previousDay = queryCache.getQueryData(['day', dayId]);
      const previousActiveTask = queryCache.getQueryData<ActiveTaskDto>('activeTask');
      const previousSchedule = queryCache.getQueryData<ScheduleDto>('schedule');

      queryCache.setQueryData<DayDto | undefined>(['day', dayId], day =>
        updateCache({
          day,
          taskId,
          body,
          previousSchedule,
          activeTaskId: previousActiveTask?.taskId,
        }),
      );

      // We are moving the currently selected task ➜ update the URL
      if (selectedTaskId === taskId || start) {
        history.push(`/day/${body.dayId}/${body.toSectionId}/${taskId}`);
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
        message: 'Task was not moved',
      });
    },

    onSettled: (result, err, { body: { dayId } }) => {
      queryCache.invalidateQueries(['day', dayId]);
      queryCache.invalidateQueries('activeTask');
      queryCache.invalidateQueries('schedule');
    },
  });
};
