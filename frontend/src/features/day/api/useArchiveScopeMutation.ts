import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { Toaster } from '@binarycapsule/ui-capsules';
import { ScopeDto } from './useScopesQuery';

const archiveScope = async (scopeId: string) => {
  const { data } = await axios.put<ScopeDto>(`/api/scopes/${scopeId}/archive`);

  return data;
};

export const useArchiveScopeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(archiveScope, {
    onSuccess: data => {
      queryClient.setQueryData<ScopeDto[] | undefined>('scopes', scopes => {
        if (!scopes) return scopes;

        return scopes.filter(({ id }) => id !== data.id);
      });

      const archivedScopesQuery = queryClient.getQueryCache().find(['archivedScopes', true]);

      if (archivedScopesQuery) {
        queryClient.setQueryData<ScopeDto[] | undefined>(['archivedScopes', true], scopes => {
          if (!scopes) return scopes;

          return [...scopes, data];
        });
      }
    },

    onError: () => {
      Toaster.error({
        title: 'Oops, something went wrong',
      });
    },
  });
};
