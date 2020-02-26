import { call, put, takeLatest } from 'redux-saga/effects';
import { getDays } from '../../api/days';
import * as types from '../../actions/days/types';
import * as activeTaskTypes from '../../actions/activeTask/types';
import { loadItem, validateSelectedDayId } from '../../helpers/localStorage';

const normalize = data => {
  const normalized = {
    byId: {},
    order: [],
  };
  data.forEach(({ day, id }) => {
    normalized.byId[id] = { id, day };
    normalized.order.push(id);
  });

  return normalized;
};

export function* getDaysSaga() {
  try {
    const { data } = yield call(getDays);
    const { byId, order } = normalize(data);

    validateSelectedDayId(order);

    const selectedDayId = loadItem('selectedDayId') || order[0];

    yield put({ type: types.GET_DAYS_SUCCESS, byId, order, selectedDayId });
    yield put({ type: activeTaskTypes.ACTIVE_TASK_REQUEST });
    if (selectedDayId && order.length > 0) {
      yield put({ type: types.GET_DAY_REQUEST, payload: selectedDayId });
    }
  } catch (error) {
    yield put({ type: types.GET_DAYS_FAILURE, error });
  }
}

export default function* watchGetDays() {
  yield takeLatest(types.GET_DAYS_REQUEST, getDaysSaga);
}
