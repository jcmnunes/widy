import React, { useState } from 'react';
import useMedia from 'react-use/lib/useMedia';
import { Button, Checkbox, Input } from '@binarycapsule/ui-capsules';
import ScopesTable from './ScopesTable/ScopesTable';
import { PageDescription, PageTitle } from '../Page.styles';
import { ScopesTableLoading } from './ScopesTable/ScopesTable.loading';
import {
  ActionsTop,
  ScopesPageWrapper,
  ScopesSearch,
  ShowArchiveScopesToggle,
} from './Scopes.styles';
import { ScopeDto, useArchivedScopes, useScopes } from '../../../day/api/useScopes';
import { ScopeModal } from '../../../day/modals/ScopeModal/ScopeModal';
import { PageWrapper } from '../../Settings.styles';

const Scopes = () => {
  const [isScopeModalOpen, setIsScopeModalOpen] = useState(false);
  const [showArchivedScopes, setShowArchivedScopes] = useState(false);
  const [filter, setFilter] = useState('');

  const { data: scopes, status: scopesStatus } = useScopes();
  const { data: archivedScopes, status: archivedScopesStatus } = useArchivedScopes(
    showArchivedScopes,
  );

  const isWide = useMedia('(min-width: 600px)');

  const filterScopes = (scopesToFilter: ScopeDto[]) => {
    return scopesToFilter.filter(({ name, shortCode }) => {
      if (filter) {
        const lowerCaseFilter = filter.toLowerCase();
        return (
          name.toLowerCase().includes(lowerCaseFilter) ||
          shortCode.toLowerCase().includes(lowerCaseFilter)
        );
      }
      return true;
    });
  };

  return (
    <>
      <PageWrapper>
        <PageTitle>Scopes</PageTitle>
        <PageDescription>Manage your task scopes below.</PageDescription>
        <ScopesPageWrapper>
          <ActionsTop>
            <Button
              onClick={() => setIsScopeModalOpen(true)}
              leftIcon="plus"
              size={isWide ? 'large' : 'medium'}
              disabled={scopesStatus === 'loading'}
            >
              Create new scope
            </Button>
            <ScopesSearch>
              <Input
                value={filter}
                onChange={({ target: { value } }) => setFilter(value)}
                placeholder="Search scopes"
                size={isWide ? 'large' : 'medium'}
                leftIcon="search"
                disabled={scopesStatus === 'loading'}
              />
            </ScopesSearch>
          </ActionsTop>
          {scopesStatus === 'loading' ? (
            <ScopesTableLoading />
          ) : (
            <ScopesTable scopes={filterScopes(scopes!)} />
          )}
          <ShowArchiveScopesToggle>
            <Checkbox
              variantColor="primary"
              checked={showArchivedScopes}
              onChange={() => setShowArchivedScopes(!showArchivedScopes)}
              isDisabled={scopesStatus === 'loading'}
            >
              Show archived scopes
            </Checkbox>
          </ShowArchiveScopesToggle>
          {archivedScopesStatus === 'loading' ? (
            <ScopesTableLoading />
          ) : (
            showArchivedScopes &&
            archivedScopesStatus === 'success' &&
            archivedScopes && <ScopesTable isArchived scopes={filterScopes(archivedScopes)} />
          )}
        </ScopesPageWrapper>
      </PageWrapper>
      {isScopeModalOpen && <ScopeModal closeModal={() => setIsScopeModalOpen(false)} />}
    </>
  );
};

export default Scopes;
