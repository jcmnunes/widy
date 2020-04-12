import { createSelector } from 'reselect';
import { RootState } from '../../../reducers';

export const activeTaskStateSelector = (state: RootState) => state.newActiveTask;
export const activeTaskTickSelector = createSelector(activeTaskStateSelector, ({ tick }) => tick);
