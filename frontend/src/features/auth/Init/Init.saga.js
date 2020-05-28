import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { INIT_REQUEST } from './Init.types';
import { initFailure, initSuccess } from './Init.actions';

export const getMe = () => axios.get('/api/users/me');

export function* initSaga() {
  try {
    const { data } = yield call(getMe);
    yield put(initSuccess(data));
  } catch (error) {
    yield put(initFailure());
  }
}

export default function* watchInit() {
  yield takeLatest(INIT_REQUEST, initSaga);
}
