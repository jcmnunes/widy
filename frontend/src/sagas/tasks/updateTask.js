import { call, put, takeLatest, select } from 'redux-saga/effects';
import { Toaster } from '@binarycapsule/ui-capsules';
import { updateTask } from '../../api/tasks';
import * as types from '../../actions/tasks/types';

const getDayId = state => state.days.selected;
const getSectionId = state => state.sections.selected;
const getTasksById = state => state.tasks.byId;

export function* updateTaskSaga(action) {
  const dayId = action.context ? action.context.dayId : yield select(getDayId);
  const sectionId = action.context ? action.context.sectionId : yield select(getSectionId);

  try {
    const params = { dayId, sectionId, payload: action.payload };
    if (!action.context) {
      yield put({
        type: types.UPDATE_TASK_SUCCESS,
        taskId: action.taskId,
        payload: params.payload,
      });
    }
    yield call(updateTask, action.taskId, params);
  } catch (error) {
    yield Toaster.error({
      title: 'Could not update the task',
      message: 'Something went wrong while updating the task.',
    });
    if (!action.context) {
      const taskById = yield select(getTasksById);
      const selectedTask = taskById[action.taskId];
      yield put({
        type: types.UPDATE_TASK_FAILURE,
        error,
        taskId: action.taskId,
        payload: selectedTask,
      });
    }
  }
}

export default function* watchCreateTask() {
  yield takeLatest(types.UPDATE_TASK_REQUEST, updateTaskSaga);
}
