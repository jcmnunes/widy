import * as types from './types';

export const updateActiveTask = payload => ({
  type: types.UPDATE_ACTIVE_TASK,
  payload,
});

export const storeActiveTask = activeTask => ({
  type: types.STORE_ACTIVE_TASK,
  activeTask,
});

export const resetActiveTask = () => ({
  type: types.RESET_ACTIVE_TASK,
});
