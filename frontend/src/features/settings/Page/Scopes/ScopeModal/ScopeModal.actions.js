import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Toaster } from '@binarycapsule/ui-capsules';

export const createScopeApi = params => axios.post('/api/scopes', params);
export const updateScopeApi = params => axios.put('/api/scopes', params);

export const CREATE_SCOPE_REQUEST = 'scopes/CREATE_SCOPE_REQUEST';
export const CREATE_SCOPE_SUCCESS = 'scopes/CREATE_SCOPE_SUCCESS';

export const UPDATE_SCOPE_REQUEST = 'scopes/UPDATE_SCOPE_REQUEST';
export const UPDATE_SCOPE_SUCCESS = 'scopes/UPDATE_SCOPE_SUCCESS';

export const createScope = (values, helpers) => ({
  type: CREATE_SCOPE_REQUEST,
  values,
  helpers,
});

export const updateScope = (scopeId, values, helpers) => ({
  type: UPDATE_SCOPE_REQUEST,
  scopeId,
  values,
  helpers,
});

export const createScopeSuccess = scope => ({
  type: CREATE_SCOPE_SUCCESS,
  scope,
});

export const updateScopeSuccess = scope => ({
  type: UPDATE_SCOPE_SUCCESS,
  scope,
});

export function* createScopeSaga(action) {
  try {
    const { data: scope } = yield call(() => createScopeApi(action.values));
    yield put(createScopeSuccess(scope));
    action.helpers.onCreateScope(scope);
    action.helpers.closeModal();
  } catch (error) {
    const {
      response: { data },
    } = error;
    if (data && data.field && data.error) {
      action.helpers.setFieldError(data.field, data.error);
    } else {
      action.helpers.setSubmitting();
      Toaster.error({
        title: 'Something went wrong',
        message: 'Scope could not be created',
      });
    }
  }
}

export function* updateScopeSaga(action) {
  try {
    const { data: scope } = yield call(() =>
      updateScopeApi({ id: action.scopeId, payload: action.values }),
    );
    yield put(updateScopeSuccess(scope));
    action.helpers.closeModal();
  } catch (error) {
    const {
      response: { data },
    } = error;
    if (data && data.field && data.error) {
      action.helpers.setFieldError(data.field, data.error);
    } else {
      Toaster.error({
        title: 'Something went wrong',
        message: 'Scope could not be updated',
      });
      action.helpers.setSubmitting();
    }
  }
}

export function* watchCreateScopeSaga() {
  yield takeLatest(CREATE_SCOPE_REQUEST, createScopeSaga);
}

export function* watchUpdateScopeSaga() {
  yield takeLatest(UPDATE_SCOPE_REQUEST, updateScopeSaga);
}
