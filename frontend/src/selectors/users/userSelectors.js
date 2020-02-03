import { createSelector } from 'reselect';

const initSelector = state => state.auth.init;

// eslint-disable-next-line import/prefer-default-export
export const meSelector = createSelector(initSelector, ({ user }) => user);
