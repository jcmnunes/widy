import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, MenuItem } from '@binarycapsule/ui-capsules';
import ScopeCode from '../../../../../components/ScopeCode/ScopeCode';
import DotsMenu from '../../../../../components/DotsMenu/DotsMenu';
import EmptyScopesTable from '../EmptyScopesTable/EmptyScopesTable';
import { Row, ScopeName, StyledScopesTable } from './ScopesTable.styles';
import { useArchiveScope } from '../../../../day/api/useArchiveScope';
import { useUnarchiveScope } from '../../../../day/api/useUnarchiveScope';
import { ScopeModal } from '../../../../day/modals/ScopeModal/ScopeModal';

const ScopesTable = ({ isArchived, scopes }) => {
  const [selectedScope, setSelectedScope] = useState(null);

  const [archiveScope] = useArchiveScope();
  const [unarchiveScope] = useUnarchiveScope();

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
              <MenuItem
                text="Edit"
                leftAddon={<Icon icon="pencil" size="18px" />}
                onClick={() => setSelectedScope(scope)}
              />

              <MenuItem
                text={isArchived ? 'Unarchive' : 'Archive'}
                leftAddon={<Icon icon={isArchived ? 'arrow_up' : 'archive'} size="18px" />}
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
