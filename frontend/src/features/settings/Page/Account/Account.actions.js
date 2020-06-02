import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Toaster } from '@binarycapsule/ui-capsules';

export const saveAccountSettingsApi = params => axios.put('/api/users/me', params);

export const SAVE_ACCOUNT_SETTINGS_REQUEST = 'settings/account/SAVE_ACCOUNT_SETTINGS_REQUEST';
export const SAVE_ACCOUNT_SETTINGS_SUCCESS = 'settings/account/SAVE_ACCOUNT_SETTINGS_SUCCESS';
export const SAVE_ACCOUNT_SETTINGS_FAILURE = 'settings/account/SAVE_ACCOUNT_SETTINGS_FAILURE';

export const saveAccountSettings = (values, initialValues, helpers) => ({
  type: SAVE_ACCOUNT_SETTINGS_REQUEST,
  values,
  initialValues,
  helpers,
});

export function* saveAccountSettingsSaga(action) {
  try {
    const params = { accountSettings: action.values };
    yield call(() => saveAccountSettingsApi(params));
    yield put({ type: SAVE_ACCOUNT_SETTINGS_SUCCESS, accountSettings: action.values });
    action.helpers.resetForm({ values: { ...action.values } });
    action.helpers.setSubmitting(false);
  } catch (error) {
    yield put({ type: SAVE_ACCOUNT_SETTINGS_FAILURE });
    action.helpers.resetForm({ values: { ...action.initialValues } });
    Toaster.error({
      title: 'Something went wrong',
      message: 'Settings could not be saved',
    });
  }
}

export function* watchSaveAccountSettingsSaga() {
  yield takeLatest(SAVE_ACCOUNT_SETTINGS_REQUEST, saveAccountSettingsSaga);
}
