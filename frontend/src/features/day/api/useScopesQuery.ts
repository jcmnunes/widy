import axios from 'axios';
import { useQuery } from 'react-query';
import { useMemo } from 'react';

export interface ScopeDto {
  id: string;
  name: string;
  shortCode: string;
}

export interface ScopeOption {
  value: string;
  label: string;
  shortCode: string;
}

const getScopes = async (isArchived?: boolean) => {
  const { data } = await axios.get<ScopeDto[]>(`/api/scopes${isArchived ? `?isArchived=1` : ''}`);
  return data;
};

export const useScopesQuery = () => {
  return useQuery('scopes', () => getScopes());
};

export const useArchivedScopes = (isArchived: boolean) => {
  return useQuery(['archivedScopes', isArchived], () => getScopes(isArchived), {
    enabled: isArchived,
  });
};

export const useScopesOptions = (): ScopeOption[] => {
  const { data: scopes } = useScopesQuery();

  return useMemo(() => {
    if (!scopes) return [];

    return scopes.map(({ id, name, shortCode }) => ({
      value: id,
      label: name,
      shortCode,
    }));
  }, [scopes]);
};
