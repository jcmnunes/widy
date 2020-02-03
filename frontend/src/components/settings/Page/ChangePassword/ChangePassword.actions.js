import axios from 'axios';
import { call, takeLatest } from 'redux-saga/effects';
import { Toaster } from '@binarycapsule/ui-capsules';

export const changePasswordApi = params => axios.post('/api/auth/change', params);

export const CHANGE_PASSWORD_REQUEST = 'settings/changePassword/CHANGE_PASSWORD_REQUEST';

export const changePassword = (values, initialValues, helpers) => ({
  type: CHANGE_PASSWORD_REQUEST,
  values,
  initialValues,
  helpers,
});

export function* changePasswordSaga(action) {
  try {
    const params = action.values;
    yield call(() => changePasswordApi(params));
    action.helpers.resetForm({ values: { ...action.initialValues } });
    action.helpers.setSubmitting(false);
    Toaster.success({
      title: 'Done!',
      message: 'Password was changed successfully',
    });
  } catch (error) {
    const message = error.response ? error.response.data.message : null;
    action.helpers.resetForm({ values: { ...action.initialValues } });
    Toaster.error({
      title: 'Oops!',
      message: message || 'Password could not be saved',
    });
  }
}

export function* watchChangePasswordSaga() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePasswordSaga);
}
