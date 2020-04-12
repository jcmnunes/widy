import { createSelector } from 'reselect';
import { meSelector } from '../users/userSelectors';

export const scopesSelector = createSelector(meSelector, ({ scopes }) => scopes);
export const archivedScopesSelector = createSelector(
  meSelector,
  ({ archivedScopes }) => archivedScopes,
);
export const allScopesSelector = createSelector(
  scopesSelector,
  archivedScopesSelector,
  (scopes, archivedScopes) => [...scopes, ...archivedScopes],
);

// export const scopesOptionsSelector = createSelector(scopesSelector, scopes =>
//   scopes.map(({ id, name, shortCode }) => ({
//     value: id,
//     label: name,
//     shortCode,
//   })),
// );

export const scopesOptionsSelector = () => [];
