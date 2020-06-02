import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../reducers';

export const sidebarSelector = (state: RootState) => state.sidebar;
export const isSidebarOpenSelector = createSelector(
  sidebarSelector,
  ({ isSidebarOpen }) => isSidebarOpen,
);
