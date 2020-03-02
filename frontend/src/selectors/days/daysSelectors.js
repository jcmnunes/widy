import { createSelector } from 'reselect';

export const selectedDayIdSelector = state => state.days.selected;
const daysByIdSelector = state => state.days.byId;
export const daysNextPageSelector = state => state.days.nextPage;
export const isLoadingMoreDaysSelector = state => state.days.isLoadingMoreDays;

// eslint-disable-next-line
export const selectedDaySelector = createSelector(
  selectedDayIdSelector,
  daysByIdSelector,
  (selectedDayId, daysById) => (selectedDayId ? daysById[selectedDayId] : null),
);
