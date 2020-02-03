import { call, put, takeLatest } from 'redux-saga/effects';
import { getDay } from '../../api/days';
import * as types from '../../actions/days/types';
import { loadItem } from '../../helpers/localStorage';

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
    const { data } = yield call(getDay, action.payload);
    const { sections, tasks } = normalize(data);

    yield put({ type: types.GET_DAY_SUCCESS, sections, tasks });
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
