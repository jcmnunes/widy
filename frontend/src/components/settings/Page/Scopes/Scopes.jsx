import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, Checkbox } from '@binarycapsule/ui-capsules';
import ScopesTable from './ScopesTable/ScopesTable';
import { PageDescription, PageTitle } from '../Page.styles';
import ScopeModal from './ScopeModal/ScopeModal';
import {
  archivedScopesSelector,
  scopesSelector,
} from '../../../../selectors/scopes/scopesSelectors';
import {
  ActionsTop,
  ScopesPageWrapper,
  ScopesSearch,
  ShowArchiveScopesToggle,
} from './Scopes.styles';

const Scopes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showArchivedScopes, setShowArchivedScopes] = useState(false);
  const [filter, setFilter] = useState('');

  const scopes = useSelector(scopesSelector);
  const archivedScopes = useSelector(archivedScopesSelector);

  const filterScopes = scopesToFilter => {
    return scopesToFilter.filter(({ name, shortCode }) => {
      if (filter) {
        return name.toLowerCase().includes(filter) || shortCode.toLowerCase().includes(filter);
      }
      return true;
    });
  };

  return (
    <>
      <div>
        <PageTitle>Scopes</PageTitle>
        <PageDescription>Manage your task scopes below.</PageDescription>
        <ScopesPageWrapper>
          <ActionsTop>
            <Button
              onClick={() => setIsOpen(true)}
              appearance="primary"
              iconBefore="PLUS"
              size="large"
            >
              Create new scope
            </Button>
            <ScopesSearch>
              <Input
                value={filter}
                onChange={({ target: { value } }) => setFilter(value)}
                placeholder="Search scopes"
                size="large"
                iconBefore="SEARCH"
              />
            </ScopesSearch>
          </ActionsTop>
          <ScopesTable scopes={filterScopes(scopes)} />
          <ShowArchiveScopesToggle>
            <Checkbox
              appearance="primary"
              checked={showArchivedScopes}
              onChange={() => setShowArchivedScopes(!showArchivedScopes)}
            >
              Show archived scopes
            </Checkbox>
          </ShowArchiveScopesToggle>
          {showArchivedScopes && (
            <ScopesTable isArchived scopes={filterScopes(archivedScopes)} filter={filter} />
          )}
        </ScopesPageWrapper>
      </div>
      {isOpen && <ScopeModal closeModal={() => setIsOpen(false)} />}
    </>
  );
};

export default Scopes;
