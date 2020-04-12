import { call, put, takeLatest, select } from 'redux-saga/effects';
import { createTask } from '../../api/tasks';
import * as types from '../../actions/tasks/types';
import * as modalTypes from '../../actions/modals/types';

const getDayId = state => state.tasks.createTask.dayId;
const getSectionId = state => state.tasks.createTask.sectionId;

export function* createTaskSaga(action) {
  try {
    const dayId = yield select(getDayId);
    const sectionId = yield select(getSectionId);
    const params = {
      dayId,
      sectionId,
      payload: {
        title: action.title,
        notes: '',
        time: 0,
        start: null,
        completed: false,
        scopeId: action.scopeId,
      },
    };
    const { data: task } = yield call(() => createTask(params));
    yield put({
      type: types.CREATE_TASK_SUCCESS,
      payload: {
        dayId,
        sectionId,
        task: {
          id: task.id,
          title: task.title,
          notes: task.notes,
          time: task.time,
          start: task.start,
          completed: task.completed,
          scopeId: task.scopeId,
        },
      },
    });
    yield put({
      type: modalTypes.CLOSE_MODAL,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    yield put({ type: types.CREATE_TASK_FAILURE, error });
  }
}

export default function* watchCreateTask() {
  yield takeLatest(types.CREATE_TASK_REQUEST, createTaskSaga);
}
