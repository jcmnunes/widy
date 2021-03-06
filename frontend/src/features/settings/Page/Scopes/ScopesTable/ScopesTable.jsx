import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@binarycapsule/ui-capsules';
import ScopeCode from '../../../../../components/ScopeCode/ScopeCode';
import DotsMenu from '../../../../../components/DotsMenu/DotsMenu';
import EmptyScopesTable from '../EmptyScopesTable/EmptyScopesTable';
import { Row, ScopeName, StyledScopesTable } from './ScopesTable.styles';
import { useArchiveScopeMutation } from '../../../../day/api/useArchiveScopeMutation';
import { useUnarchiveScopeMutation } from '../../../../day/api/useUnarchiveScopeMutation';
import { ScopeModal } from '../../../../day/modals/ScopeModal/ScopeModal';

const ScopesTable = ({ isArchived, scopes }) => {
  const [selectedScope, setSelectedScope] = useState(null);

  const { mutate: archiveScope, isLoading: archiveScopeLoading } = useArchiveScopeMutation();

  const { mutate: unarchiveScope, isLoading: unarchiveScopeLoading } = useUnarchiveScopeMutation();

  if (scopes.length === 0) {
    return (
      <EmptyScopesTable message={isArchived ? 'No archived scopes found' : 'No scopes found'} />
    );
  }

  return (
    <>
      <StyledScopesTable>
        {scopes.map(scope => (
          <Row key={scope.id}>
            <ScopeCode scopeCode={scope.shortCode} onClick={() => setSelectedScope(scope)} />
            <ScopeName onClick={() => setSelectedScope(scope)}>{scope.name}</ScopeName>
            <DotsMenu>
              <MenuItem text="Edit" leftIcon="pencil" onClick={() => setSelectedScope(scope)} />

              <MenuItem
                text={isArchived ? 'Unarchive' : 'Archive'}
                leftIcon={isArchived ? 'arrow_up' : 'archive'}
                isLoading={archiveScopeLoading || unarchiveScopeLoading}
                onClick={() => {
                  isArchived ? unarchiveScope(scope.id) : archiveScope(scope.id);
                }}
                closeOnAction={false}
              />
            </DotsMenu>
          </Row>
        ))}
      </StyledScopesTable>

      {!!selectedScope && (
        <ScopeModal scope={selectedScope} closeModal={() => setSelectedScope(null)} />
      )}
    </>
  );
};

ScopesTable.defaultProps = {
  isArchived: false,
};

ScopesTable.propTypes = {
  isArchived: PropTypes.bool,
  scopes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ScopesTable;
