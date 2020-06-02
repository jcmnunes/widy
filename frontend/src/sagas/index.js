import { all } from 'redux-saga/effects';
import login from '../features/auth/Login/Login.saga';
import logout from '../features/auth/Logout/Logout.saga';
import forgot from '../features/auth/Forgot/Forgot.sagas';
import reset from '../features/auth/Reset/Reset.saga';
import init from '../features/auth/Init/Init.saga';
import { watchSaveAccountSettingsSaga as saveAccountSettings } from '../features/settings/Page/Account/Account.actions';
import { watchChangePasswordSaga as changePassword } from '../features/settings/Page/ChangePassword/ChangePassword.actions';

export default function* rootSaga() {
  yield all([
    login(),
    logout(),
    forgot(),
    reset(),
    init(),
    saveAccountSettings(),
    changePassword(),
  ]);
}
