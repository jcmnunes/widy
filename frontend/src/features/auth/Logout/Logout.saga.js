import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import history from '../../../router/history';
import { LOGOUT_REQUEST } from './Logout.types';
import { logoutFailure, logoutSuccess } from './Logout.actions';

export const logoutAPI = () => axios.get('/api/auth/logout');

export function* logoutSaga() {
  try {
    yield call(logoutAPI);
    yield put(logoutSuccess());
    yield history.push('/login');
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

export default function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
}
