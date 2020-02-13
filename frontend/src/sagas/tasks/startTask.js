import { call, put, takeLatest, select } from 'redux-saga/effects';
import moment from 'moment';
import { startTask } from '../../api/tasks';
import * as types from '../../actions/tasks/types';
import { storeActiveTask } from '../../actions/activeTask';
import { stopTask } from '../../actions/tasks';

const getDayId = state => state.days.selected;
const getActiveTask = state => state.activeTask;

export function* startTaskSaga(action) {
  const dayId = yield select(getDayId);
  const { taskId: activeTaskId } = yield select(getActiveTask);

  // If there is an active task ➜ stop it
  if (activeTaskId) {
    yield put(stopTask());
  }

  const { taskId, sectionId, taskTitle, taskTime } = action;

  try {
    const params = {
      dayId,
      sectionId,
      start: moment().toISOString(),
    };
    yield put({
      type: types.UPDATE_TASK_SUCCESS,
      taskId,
      payload: { start: params.start },
    });
    const activeTask = {
      taskId,
      title: taskTitle,
      sectionId,
      dayId,
      start: params.start,
      time: taskTime,
      inBreak: false,
    };
    yield put(storeActiveTask(activeTask));
    yield call(() => startTask(taskId, params));
  } catch (error) {
    yield put({ type: types.CREATE_TASK_FAILURE, error });
  }
}

export default function* watchStartTask() {
  yield takeLatest(types.START_TASK_REQUEST, startTaskSaga);
}
