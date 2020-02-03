import { storeSelectedSectionId } from '../../../../actions/sections';
import { stopTask, storeSelectedTaskId, updateTask } from '../../../../actions/tasks';
import { openModal } from '../../../../actions/modals';
import { RENAME_TASK } from '../../../modals/types';

export const handleTaskClick = (taskId, sectionId) => dispatch => {
  dispatch(storeSelectedSectionId(sectionId));
  dispatch(storeSelectedTaskId(taskId));
};

export const handleTaskRename = () => dispatch => {
  dispatch(openModal(RENAME_TASK));
};

export const handleTaskCompletedStateChange = (
  isActive,
  isCompleted,
  taskId,
  sectionId,
) => dispatch => {
  if (isActive) {
    dispatch(stopTask(taskId, sectionId));
  }
  dispatch(updateTask(taskId, { completed: !isCompleted, start: null }));
};
