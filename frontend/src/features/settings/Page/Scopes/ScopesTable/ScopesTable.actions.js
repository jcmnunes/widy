import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Toaster } from '@binarycapsule/ui-capsules';

export const archiveScopeApi = params => axios.put('/api/scopes/archive', params);
export const unarchiveScopeApi = params => axios.put('/api/scopes/unarchive', params);

export const ARCHIVE_SCOPE_REQUEST = 'scopes/ARCHIVE_SCOPE_REQUEST';
export const ARCHIVE_SCOPE_SUCCESS = 'scopes/ARCHIVE_SCOPE_SUCCESS';

export const UNARCHIVE_SCOPE_REQUEST = 'scopes/UNARCHIVE_SCOPE_REQUEST';
export const UNARCHIVE_SCOPE_SUCCESS = 'scopes/UNARCHIVE_SCOPE_SUCCESS';

export const archiveScope = (scopeId, helpers) => ({
  type: ARCHIVE_SCOPE_REQUEST,
  scopeId,
  helpers,
});

export const unarchiveScope = (scopeId, helpers) => ({
  type: UNARCHIVE_SCOPE_REQUEST,
  scopeId,
  helpers,
});

export const archiveScopeSuccess = scope => ({
  type: ARCHIVE_SCOPE_SUCCESS,
  scope,
});

export const unarchiveScopeSuccess = scope => ({
  type: UNARCHIVE_SCOPE_SUCCESS,
  scope,
});

export function* archiveScopeSaga(action) {
  try {
    const { data: scope } = yield call(() => archiveScopeApi({ id: action.scopeId }));
    yield put(archiveScopeSuccess(scope));
  } catch (error) {
    Toaster.error({
      title: 'Something went wrong',
      message: 'Scope could not be archived',
    });
  } finally {
    action.helpers.setIsArchivingScope(false);
  }
}

export function* unarchiveScopeSaga(action) {
  try {
    const { data: scope } = yield call(() => unarchiveScopeApi({ id: action.scopeId }));
    yield put(unarchiveScopeSuccess(scope));
  } catch (error) {
    Toaster.error({
      title: 'Something went wrong',
      message: 'Scope could not be unarchived',
    });
  } finally {
    action.helpers.setIsArchivingScope(false);
  }
}

export function* watchArchiveScopeSaga() {
  yield takeLatest(ARCHIVE_SCOPE_REQUEST, archiveScopeSaga);
}

export function* watchUnarchiveScopeSaga() {
  yield takeLatest(UNARCHIVE_SCOPE_REQUEST, unarchiveScopeSaga);
}
