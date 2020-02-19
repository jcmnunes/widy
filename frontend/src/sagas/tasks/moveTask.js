import { call, put, takeLatest, select } from 'redux-saga/effects';
import { Toaster } from '@binarycapsule/ui-capsules';
import { moveTask } from '../../api/tasks';
import * as types from '../../actions/tasks/types';
import * as sectionTypes from '../../actions/sections/types';

const getDayId = state => state.days.selected;

export function* moveTaskSaga(action) {
  const dayId = yield select(getDayId);

  const { taskId, fromSectionId, toSectionId, fromIndex, toIndex } = action;
  const params = {
    dayId,
    fromSectionId,
    toSectionId,
    fromIndex,
    toIndex,
  };

  try {
    yield call(() => moveTask(taskId, params));
  } catch (error) {
    yield Toaster.error({
      title: 'Could not move the task',
      message: 'Something went wrong while moving the task.',
    });
    // Revert the position of the task
    if (params.fromSectionId === params.toSectionId) {
      yield put({
        type: sectionTypes.REORDER_TASKS_ARRAY,
        sectionId: params.fromSectionId,
        fromIndex: params.toIndex,
        toIndex: params.fromIndex,
      });
    } else {
      yield put({
        type: sectionTypes.REMOVE_TASK,
        sectionId: params.toSectionId,
        index: params.toIndex,
      });
      yield put({
        type: sectionTypes.ADD_TASK_AT_INDEX,
        sectionId: params.fromSectionId,
        index: params.fromIndex,
        taskId: params.taskId,
      });
    }
  }
}

export default function* watchMoveTask() {
  yield takeLatest(types.MOVE_TASK_REQUEST, moveTaskSaga);
}
