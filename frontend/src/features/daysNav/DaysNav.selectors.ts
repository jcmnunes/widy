import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../reducers';

export const daysNavSelector = (state: RootState) => state.daysNav;
export const isDaysNavOpenSelector = createSelector(
  daysNavSelector,
  ({ isDaysNavOpen }) => isDaysNavOpen,
);
