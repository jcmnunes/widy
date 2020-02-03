import { createSelector } from 'reselect';
import { settingsSelector } from '../../components/auth/Init/init.selectors';

// eslint-disable-next-line import/prefer-default-export
export const pomodoroSettingsSelector = createSelector(
  settingsSelector,
  ({ pomodoro }) => pomodoro,
);
