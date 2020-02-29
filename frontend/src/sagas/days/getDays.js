import { call, put, takeLatest } from 'redux-saga/effects';
import { Toaster } from '@binarycapsule/ui-capsules';
import { getDays, getMoreDays } from '../../api/days';
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
    const {
      data: { days, nextPage },
    } = yield call(getDays);

    const { byId, order } = normalize(days);

    validateSelectedDayId(order);

    const selectedDayId = loadItem('selectedDayId') || order[0];

    yield put({ type: types.GET_DAYS_SUCCESS, byId, order, selectedDayId, nextPage });
    yield put({ type: activeTaskTypes.ACTIVE_TASK_REQUEST });
    if (selectedDayId && order.length > 0) {
      yield put({ type: types.GET_DAY_REQUEST, payload: selectedDayId });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    Toaster.error({
      title: 'Oops',
      message: 'Something went wrong.',
    });
    yield put({ type: types.GET_DAYS_FAILURE });
  }
}

export function* watchGetDays() {
  yield takeLatest(types.GET_DAYS_REQUEST, getDaysSaga);
}

export function* getMoreDaysSaga(action) {
  try {
    const { page } = action;
    const {
      data: { days, nextPage },
    } = yield call(() => getMoreDays(page));

    const { byId, order } = normalize(days);

    yield put({ type: types.GET_MORE_DAYS_SUCCESS, byId, order, nextPage });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    Toaster.error({
      title: 'Oops',
      message: 'Something went wrong. Could not load more days',
    });
    yield put({ type: types.GET_MORE_DAYS_FAILURE });
  }
}

export function* watchGetMoreDays() {
  yield takeLatest(types.GET_MORE_DAYS_REQUEST, getMoreDaysSaga);
}
