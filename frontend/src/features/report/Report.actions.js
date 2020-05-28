import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Toaster } from '@binarycapsule/ui-capsules';

export const getDaysApi = () => axios.get('/api/days');
export const getReportApi = dayId => axios.get(`/api/report/${dayId}`);

export const REPORT_GET_DAYS_REQUEST = 'report/GET_DAYS_REQUEST';
export const REPORT_GET_DAYS_SUCCESS = 'report/GET_DAYS_SUCCESS';
export const REPORT_GET_DAYS_FAILURE = 'report/GET_DAYS_FAILURE';

export const GET_REPORT_REQUEST = 'report/GET_REPORT_REQUEST';
export const GET_REPORT_SUCCESS = 'report/GET_REPORT_SUCCESS';
export const GET_REPORT_FAILURE = 'report/GET_REPORT_FAILURE';

export const getDays = () => ({
  type: REPORT_GET_DAYS_REQUEST,
});

export const getReport = dayId => ({
  type: GET_REPORT_REQUEST,
  dayId,
});

export function* getDaysSaga() {
  try {
    const {
      data: { days },
    } = yield call(() => getDaysApi());
    yield put({ type: REPORT_GET_DAYS_SUCCESS, days });
  } catch (error) {
    yield put({ type: REPORT_GET_DAYS_FAILURE });
    Toaster.error({
      title: 'Something went wrong',
    });
  }
}

export function* getReportSaga(action) {
  try {
    const { data } = yield call(() => getReportApi(action.dayId));
    yield put({ type: GET_REPORT_SUCCESS, report: data });
  } catch (error) {
    yield put({ type: GET_REPORT_FAILURE });
    Toaster.error({
      title: 'Something went wrong',
    });
  }
}

export function* watchReportGetDaysSagaSaga() {
  yield takeLatest(REPORT_GET_DAYS_REQUEST, getDaysSaga);
}

export function* watchGetReportSagaSaga() {
  yield takeLatest(GET_REPORT_REQUEST, getReportSaga);
}
