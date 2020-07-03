import { createSelector } from 'reselect';
import { RootState } from '../../../reducers';

export const dayStateSelector = (state: RootState) => state.day;
export const showScheduleSelector = createSelector(
  dayStateSelector,
  ({ showSchedule }) => showSchedule,
);
