import moment from 'moment';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { stopTask } from '../../api/tasks';
import * as types from '../../actions/tasks/types';
import { storeActiveTask } from '../../actions/activeTask';

const getActiveTask = state => state.activeTask;

export function* stopTaskSaga() {
  const { time, start, dayId, sectionId, taskId } = yield select(getActiveTask);

  try {
    const newTime = time + moment().diff(start, 'seconds');

    yield put({
      type: types.UPDATE_TASK_SUCCESS,
      taskId,
      payload: { start: null, time: newTime },
    });
    const activeTask = {
      taskId: '',
      sectionId: '',
      dayId: '',
      inBreak: false,
      time: 0,
      start: null,
      title: '',
    };
    yield put(storeActiveTask(activeTask));

    const params = {
      dayId,
      sectionId,
      time: newTime,
    };

    yield call(stopTask, taskId, params);
  } catch (error) {
    yield put({ type: types.CREATE_TASK_FAILURE, error });
  }
}

export default function* watchStopTask() {
  yield takeLatest(types.STOP_TASK_REQUEST, stopTaskSaga);
}
