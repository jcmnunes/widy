import { all } from 'redux-saga/effects';
import fetchDay from './days/getDay';
import fetchDays from './days/getDays';
import createDay from './days/createDay';
import createTask from './tasks/createTask';
import updateTask from './tasks/updateTask';
import deleteTask from './tasks/deleteTask';
import moveTask from './tasks/moveTask';
import startTask from './tasks/startTask';
import stopTask from './tasks/stopTask';
import launchTask from './tasks/launchTask';
import getActiveTask from './activeTask/getActiveTask';
import login from '../components/auth/Login/Login.saga';
import logout from '../components/auth/Logout/Logout.saga';
import forgot from '../components/auth/Forgot/Forgot.sagas';
import reset from '../components/auth/Reset/Reset.saga';
import init from '../components/auth/Init/Init.saga';
import { watchSavePomodoroSettingsSaga as savePomodoroSettings } from '../components/settings/Page/Pomodoro/Pomodoro.actions';
import { watchSaveAccountSettingsSaga as saveAccountSettings } from '../components/settings/Page/Account/Account.actions';
import { watchChangePasswordSaga as changePassword } from '../components/settings/Page/ChangePassword/ChangePassword.actions';
import {
  watchCreateScopeSaga as createScope,
  watchUpdateScopeSaga as updateScope,
} from '../components/settings/Page/Scopes/ScopeModal/ScopeModal.actions';
import {
  watchArchiveScopeSaga as archiveScope,
  watchUnarchiveScopeSaga as unarchiveScope,
} from '../components/settings/Page/Scopes/ScopesTable/ScopesTable.actions';
import {
  watchReportGetDaysSagaSaga as reportGetDays,
  watchGetReportSagaSaga as getReport,
} from '../components/report/Report.actions';
import { watchScheduleTaskSaga as scheduleTask } from '../actions/tasks/scheduleTask.actions';

export default function* rootSaga() {
  yield all([
    fetchDays(),
    fetchDay(),
    createDay(),
    createTask(),
    updateTask(),
    moveTask(),
    deleteTask(),
    startTask(),
    stopTask(),
    launchTask(),
    getActiveTask(),
    login(),
    logout(),
    forgot(),
    reset(),
    init(),
    savePomodoroSettings(),
    saveAccountSettings(),
    changePassword(),
    createScope(),
    updateScope(),
    archiveScope(),
    unarchiveScope(),
    reportGetDays(),
    getReport(),
    scheduleTask(),
  ]);
}
