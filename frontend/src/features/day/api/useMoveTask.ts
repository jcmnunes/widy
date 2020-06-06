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

interface MoveTaskBody {
  dayId: string;
  fromSectionId: string;
  toSectionId: string;
  fromIndex: number;
  toIndex: number | null;
}

export interface MoveTaskVariables {
  taskId: string;
  body: MoveTaskBody;
  isOptimistic?: boolean;
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
  activeTaskId,
  body: { fromSectionId, toSectionId, fromIndex, toIndex },
}: UpdateCacheParams) => {
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

    const toSection = day.sections[toSectionIndex];
    const fromSection = day.sections[fromSectionIndex];
    const task = fromSection.tasks.find(({ id }) => id === taskId);

    if (!task) return day;

    const newTask = cloneDeep(task);

    // Drag to the Plan
    if (day.sections[toSectionIndex].isPlan) {
      // If the draggable is the active task ➜ stop it
      if (activeTaskId === taskId) {
        queryCache.setQueryData('activeTask', emptyActiveTask);
      }

      newTask.completed = false;
      newTask.start = null;
      newTask.time = 0;
    }

    const toIndexMod = toIndex === null ? toSection.tasks.length : toIndex;

    return produce(day, draftState => {
      draftState.sections[toSectionIndex].tasks = arrayInsert(toSection.tasks, toIndexMod, newTask);
      draftState.sections[fromSectionIndex].tasks = arrayRemove(fromSection.tasks, fromIndex);
    });
  }

  return day;
};

export const useMoveTask = () => {
  const history = useHistory();
  const { taskId: selectedTaskId } = useParams();

  return useMutation(moveTask, {
    onMutate: ({ taskId, body, isOptimistic = true }) => {
      if (!isOptimistic) return null;

      const { dayId } = body;

      queryCache.cancelQueries(['day', dayId]);
      queryCache.cancelQueries('activeTask');

      const previousDay = queryCache.getQueryData(['day', dayId]);
      const previousActiveTask = queryCache.getQueryData<ActiveTaskDto>('activeTask');

      queryCache.setQueryData<DayDto | undefined>(['day', dayId], day =>
        updateCache({
          day,
          taskId,
          body,
          activeTaskId: previousActiveTask?.taskId,
        }),
      );

      // We are moving the currently selected task ➜ update the URL
      if (selectedTaskId === taskId) {
        history.push(`/day/${body.dayId}/${body.toSectionId}/${taskId}`);
      }

      return () => {
        queryCache.setQueryData(['day', dayId], previousDay);
        queryCache.setQueryData('activeTask', previousActiveTask);
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

    onSuccess: (_, { taskId, body, isOptimistic = true }) => {
      if (isOptimistic) return;

      const { dayId } = body;

      queryCache.setQueryData<DayDto | undefined>(['day', dayId], day =>
        updateCache({
          day,
          taskId,
          body,
        }),
      );
    },

    onSettled: (result, err, { body: { dayId } }) => {
      queryCache.refetchQueries(['day', dayId]);
      queryCache.refetchQueries('activeTask');
    },
  });
};
