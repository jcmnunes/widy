import * as types from './types';

export const storeCreateTaskData = (dayId, sectionId) => ({
  type: types.STORE_CREATE_TASK_DATA,
  dayId,
  sectionId,
});

export const startCreateTaskRequest = (title, scopeId) => ({
  type: types.CREATE_TASK_REQUEST,
  title,
  scopeId,
});

export const storeSelectedTaskId = taskId => ({
  type: types.STORE_SELECTED_TASK_ID,
  taskId,
});

/**
 *
 * @param {string} taskId - Id of the task to update
 * @param {object} payload - Object containing the new props to update (e.g. to update the title
 * and time of the task: payload = { title: 'new title here', time: 23 }
 * @param {object} context - To update the task just on BE (no optimistic update on FE) pass an
 * object with shape { sectionID, dayID }
 */
export const updateTask = (taskId, payload, context = null) => ({
  type: types.UPDATE_TASK_REQUEST,
  taskId,
  payload,
  context,
});

export const updateTaskInStore = (taskId, payload) => ({
  type: types.UPDATE_TASK_SUCCESS,
  taskId,
  payload,
});

export const moveTask = (taskId, fromSectionId, toSectionId, fromIndex, toIndex) => ({
  type: types.MOVE_TASK_REQUEST,
  taskId,
  fromSectionId,
  toSectionId,
  fromIndex,
  toIndex,
});

export const deleteTask = taskId => ({
  type: types.DELETE_TASK_REQUEST,
  taskId,
});

export const startTask = (taskId, taskTitle, taskTime, sectionId) => ({
  type: types.START_TASK_REQUEST,
  taskId,
  taskTitle,
  taskTime,
  sectionId,
});

export const stopTask = () => ({
  type: types.STOP_TASK_REQUEST,
});

export const launchTask = ({
  taskId,
  taskTitle,
  taskTime,
  fromSectionId,
  toSectionId,
  fromIndex,
  toIndex = null,
}) => ({
  type: types.LAUNCH_TASK_REQUEST,
  taskId,
  taskTitle,
  taskTime,
  fromSectionId,
  toSectionId,
  fromIndex,
  toIndex,
});
