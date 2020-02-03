import { createSelector } from 'reselect';

export const userSelector = state => state.auth.init.user;

export const accountInformationSelector = createSelector(
  userSelector,
  ({ firstName, lastName, email }) => ({ firstName, lastName, email }),
);

export const settingsSelector = createSelector(userSelector, ({ settings }) => settings);
