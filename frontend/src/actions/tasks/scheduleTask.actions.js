import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Toaster } from '@binarycapsule/ui-capsules';
import { addTaskAtIndex, removeTask } from '../sections';
import { storeSelectedTaskId } from '.';

export const SCHEDULE_TASK_REQUEST = 'tasks/SCHEDULE_TASK_REQUEST';

export const scheduleTask = payload => ({
  type: SCHEDULE_TASK_REQUEST,
  payload,
});

const scheduleTaskApi = (taskId, params) => axios.post(`/api/tasks/${taskId}schedule`, params);

export function* scheduleTaskSaga(action) {
  const { dayId, sectionId, taskId, taskIndex } = action.payload;

  // Optimistically remove the task from the corresponding section
  yield put(removeTask(sectionId, taskIndex));
  yield put(storeSelectedTaskId(''));

  try {
    yield call(() => scheduleTaskApi(taskId, { dayId, sectionId }));
  } catch (error) {
    Toaster.error({
      title: 'Something went wrong',
      message: 'Task was not scheduled',
    });

    // Add the task back in case of failure
    yield put(addTaskAtIndex(sectionId, taskIndex, taskId));
  }
}

export function* watchScheduleTaskSaga() {
  yield takeLatest(SCHEDULE_TASK_REQUEST, scheduleTaskSaga);
}
