import { call, put, takeLatest, select } from 'redux-saga/effects';
import { Toaster } from '@binarycapsule/ui-capsules';
import { deleteTask } from '../../api/tasks';
import * as tasksTypes from '../../actions/tasks/types';
import * as sectionsTypes from '../../actions/sections/types';
import * as activeTaskTypes from '../../actions/activeTask/types';

const getDayId = state => state.days.selected;
const getSectionId = state => state.sections.selected;
const getSectionsById = state => state.sections.byId;
const getActiveTaskId = state => state.activeTask.taskId;

export function* deleteTaskSaga(action) {
  const { taskId } = action;
  const dayId = yield select(getDayId);
  const sectionId = yield select(getSectionId);
  const sectionsById = yield select(getSectionsById);
  const activeTaskId = yield select(getActiveTaskId);

  const taskIndex = sectionsById[sectionId].tasks.indexOf(taskId);

  try {
    const params = { dayId, sectionId };
    yield put({ type: sectionsTypes.REMOVE_TASK, sectionId, index: taskIndex });
    if (taskId === activeTaskId) {
      yield put({ type: activeTaskTypes.RESET_ACTIVE_TASK });
    }
    yield call(() => deleteTask(taskId, params));
    yield put({ type: tasksTypes.DELETE_TASK_SUCCESS, taskId });
  } catch (error) {
    yield Toaster.error({
      title: 'Could not delete the task',
      message: 'Something went wrong while deleting the task.',
    });
    yield put({ type: sectionsTypes.ADD_TASK_AT_INDEX, sectionId, index: taskIndex, taskId });
  }
}

export default function* watchDeleteTask() {
  yield takeLatest(tasksTypes.DELETE_TASK_REQUEST, deleteTaskSaga);
}
