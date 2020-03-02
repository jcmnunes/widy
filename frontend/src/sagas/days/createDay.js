import { call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { createDay } from '../../api/days';
import * as types from '../../actions/days/types';
import { saveItem } from '../../helpers/localStorage';

export function* createDaySaga() {
  try {
    const {
      data: { day },
    } = yield call(createDay, moment().format('YYYY-MM-DD'));

    yield put({ type: types.CREATE_DAY_SUCCESS, day });
    yield put({ type: types.GET_DAY_REQUEST, payload: day.id });

    saveItem('selectedDayId', day.id);
  } catch (error) {
    yield put({ type: types.CREATE_DAY_FAILURE, error });
  }
}

export default function* watchCreateDay() {
  yield takeLatest(types.CREATE_DAY_REQUEST, createDaySaga);
}
