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

const getScopes = async () => {
  const { data } = await axios.get<ScopeDto[]>(`/api/scopes`);
  return data;
};

export const useScopes = () => {
  return useQuery('scopes', getScopes);
};

export const useScopesOptions = (): ScopeOption[] => {
  const { data: scopes } = useScopes();

  return useMemo(() => {
    if (!scopes) return [];

    return scopes.map(({ id, name, shortCode }) => ({
      value: id,
      label: name,
      shortCode,
    }));
  }, [scopes]);
};
