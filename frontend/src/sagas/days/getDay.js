import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getDay } from '../../api/days';
import * as types from '../../actions/days/types';
import { loadItem } from '../../helpers/localStorage';
import { activeTaskSelector } from '../../selectors/tasks/tasksSelectors';
import { storeSelectedTaskId } from '../../actions/tasks';

const normalize = data => {
  const normalized = {
    sections: {
      day: data.day,
      byId: {},
      order: [],
    },
    tasks: {
      byId: {},
    },
  };
  data.sections.forEach(({ title, tasks, id, isPlan }) => {
    const tasksArray = tasks.map(task => task.id);
    normalized.sections.byId[id] = { id, title, isPlan, tasks: tasksArray };
    normalized.sections.order.push(id);
    tasks.forEach(({ title: taskTitle, id: taskId, notes, time, start, completed, scopeId }) => {
      normalized.tasks.byId[taskId] = {
        id: taskId,
        title: taskTitle,
        notes: notes || '',
        time: time || 0,
        start: start || null,
        completed: completed || false,
        scopeId,
      };
    });
  });

  return normalized;
};

export function* getDaySaga(action) {
  try {
    const dayId = action.payload;

    const { data } = yield call(getDay, dayId);
    const { sections, tasks } = normalize(data);

    yield put({ type: types.GET_DAY_SUCCESS, sections, tasks });

    // If the day contains the active task ➜ select it
    const { taskId: activeTaskId, dayId: activeTaskDayId } = yield select(activeTaskSelector);
    if (activeTaskId && activeTaskDayId && activeTaskDayId === dayId) {
      yield put(storeSelectedTaskId(activeTaskId));
    }
  } catch (error) {
    // If we get a 404 we probably have a wrong id in localStorage
    // Delete it and load all days again
    if (error.response && error.response.status === 404) {
      if (loadItem('selectedDayId')) {
        localStorage.removeItem('selectedDayId');
        yield put({ type: types.GET_DAYS_REQUEST });
      }
      return;
    }
    yield put({ type: types.GET_DAY_FAILURE, error });
  }
}

export default function* watchGetDay() {
  yield takeLatest(types.GET_DAY_REQUEST, getDaySaga);
}
