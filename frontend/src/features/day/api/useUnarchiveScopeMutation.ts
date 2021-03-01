import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { Toaster } from '@binarycapsule/ui-capsules';
import { ScopeDto } from './useScopesQuery';

const unarchiveScope = async (scopeId: string) => {
  const { data } = await axios.put<ScopeDto>(`/api/scopes/${scopeId}/unarchive`);
  return data;
};

export const useUnarchiveScopeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(unarchiveScope, {
    onSuccess: data => {
      queryClient.setQueryData<ScopeDto[] | undefined>('scopes', scopes => {
        if (!scopes) return scopes;

        return [...scopes, data];
      });

      queryClient.setQueryData<ScopeDto[] | undefined>(['archivedScopes', true], scopes => {
        if (!scopes) return scopes;

        return scopes.filter(({ id }) => id !== data.id);
      });
    },

    onError: () => {
      Toaster.error({
        title: 'Oops, something went wrong',
      });
    },
  });
};
