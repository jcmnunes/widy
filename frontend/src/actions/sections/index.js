import * as types from './types';

export const storeSelectedSectionId = sectionId => ({
  type: types.STORE_SELECTED_SECTION_ID,
  sectionId,
});

export const reorderTasksArray = (sectionId, fromIndex, toIndex) => ({
  type: types.REORDER_TASKS_ARRAY,
  sectionId,
  fromIndex,
  toIndex,
});

export const removeTask = (sectionId, index) => ({
  type: types.REMOVE_TASK,
  sectionId,
  index,
});

export const addTaskAtIndex = (sectionId, index, taskId) => ({
  type: types.ADD_TASK_AT_INDEX,
  sectionId,
  index,
  taskId,
});

export const appendTask = (sectionId, taskId) => ({
  type: types.APPEND_TASK,
  sectionId,
  taskId,
});
