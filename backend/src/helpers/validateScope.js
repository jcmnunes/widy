exports.validateScope = ({ id = null, name, shortCode, scopes, archivedScopes }) => {
  // eslint-disable-next-line no-unused-vars
  for (const scope of scopes) {
    if (
      name.toLowerCase().trim() === scope.name.toLowerCase() &&
      (id ? id !== scope._id.toString() : true)
    ) {
      return { field: 'name', error: 'Scope name exists.' };
    }
    if (
      shortCode.toLowerCase().trim() === scope.shortCode.toLowerCase() &&
      (id ? id !== scope._id.toString() : true)
    ) {
      return { field: 'shortCode', error: 'Scope code exists.' };
    }
  }

  // eslint-disable-next-line no-unused-vars
  for (const archivedScope of archivedScopes) {
    if (
      archivedScope.name.toLowerCase().trim() === name.toLowerCase() &&
      (id ? id !== archivedScope._id.toString() : true)
    ) {
      return { field: 'name', error: 'Scope name exists and is archived.' };
    }
    if (
      archivedScope.shortCode.toLowerCase().trim() === shortCode.toLowerCase() &&
      (id ? id !== archivedScope._id.toString() : true)
    ) {
      return { field: 'shortCode', error: 'Scope code exists and is archived.' };
    }
  }

  return null;
};
