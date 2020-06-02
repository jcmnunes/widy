import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { forgotFailure, forgotSuccess } from './Forgot.actions';
import { FORGOT_REQUEST } from './Forgot.types';

const forgotAPI = params => axios.post('/api/auth/forgot', params);

export function* forgotSaga(action) {
  try {
    yield call(forgotAPI, action.params);
    const message = 'An email was sent to you with instructions to reset your password.';
    yield put(forgotSuccess(message));
  } catch (error) {
    yield put(forgotFailure(error));
  }
}

export default function* watchForgot() {
  yield takeLatest(FORGOT_REQUEST, forgotSaga);
}
