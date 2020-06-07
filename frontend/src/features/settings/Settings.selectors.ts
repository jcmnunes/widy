import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../reducers';

export const settingsSelector = (state: RootState) => state.settings;

export const isSettingsMenuOpenSelector = createSelector(
  settingsSelector,
  ({ isSettingsMenuOpen }) => isSettingsMenuOpen,
);
