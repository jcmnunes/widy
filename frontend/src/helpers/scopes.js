/**
 * Returns the task's scope short code
 *
 * @param {string} scopeId - The scope id
 * @param {array} scopes - List of scopes
 * @returns {string | null} - Scope short code (if it exists) or null
 */
// eslint-disable-next-line import/prefer-default-export
export const findScopeCode = (scopeId, scopes) => {
  const scope = scopes.find(({ id }) => id === scopeId);
  return scope ? scope.shortCode : null;
};
