import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { DropdownItem } from '@binarycapsule/ui-capsules';
import ScopeCode from '../../../../../components/ScopeCode/ScopeCode';
import DotsMenu from '../../../../../components/DotsMenu/DotsMenu';
import ScopeModal from '../ScopeModal/ScopeModal';
import { archiveScope, unarchiveScope } from './ScopesTable.actions';
import EmptyScopesTable from '../EmptyScopesTable/EmptyScopesTable';

const StyledScopesTable = styled.div`
  border: 1px solid ${props => props.theme.neutral200};
  border-radius: 4px;
  margin-top: 24px;
`;

const ScopeName = styled.span`
  display: inline-block;
  font-size: 16px;
  flex: 1;
  margin: 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
  padding: 0 24px;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:nth-child(odd) {
    background: #fff;
  }

  &:nth-child(even) {
    background: ${props => props.theme.neutral050};
  }
`;

const ScopesTable = ({ isArchived, scopes }) => {
  const [selectedScope, setSelectedScope] = useState(null);
  const [isArchivingScope, setIsArchivingScope] = useState(false);

  const dispatch = useDispatch();

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
              <DropdownItem text="Edit" icon="edit" handleAction={() => setSelectedScope(scope)} />
              <DropdownItem
                text={isArchived ? 'Unarchive' : 'Archive'}
                icon={isArchived ? 'unarchive' : 'archive'}
                isLoading={isArchivingScope}
                handleAction={() => {
                  isArchived
                    ? dispatch(unarchiveScope(scope.id, { setIsArchivingScope }))
                    : dispatch(archiveScope(scope.id, { setIsArchivingScope }));
                  setIsArchivingScope(true);
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
