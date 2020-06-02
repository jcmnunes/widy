import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Toaster } from '@binarycapsule/ui-capsules';
import history from '../../../router/history';
import { RESET_REQUEST } from './Reset.types';
import { resetFailure, resetSuccess } from './Reset.actions';

export const resetAPI = params => axios.post('/api/auth/reset', params);

const getErrorMessage = error => {
  if (error.response && error.response.status === 400) {
    if (error.response.data) {
      return error.response.data.message;
    }
  }
  return 'Something went wrong';
};

export function* resetSaga(action) {
  try {
    yield call(resetAPI, action.params);
    yield put(resetSuccess());
    yield history.push('/');
    yield Toaster.success({
      title: 'Password changed',
      message: 'Your password was changed successfully!',
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    yield put(resetFailure(errorMessage));
  }
}

export default function* watchForgot() {
  yield takeLatest(RESET_REQUEST, resetSaga);
}
