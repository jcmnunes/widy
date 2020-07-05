import axios from 'axios';
import { queryCache, useMutation } from 'react-query';
import { Toaster } from '@binarycapsule/ui-capsules';
import { ScopeDto } from './useScopes';

const archiveScope = async (scopeId: string) => {
  const { data } = await axios.put<ScopeDto>(`/api/scopes/${scopeId}/archive`);
  return data;
};

export const useArchiveScope = () => {
  return useMutation(archiveScope, {
    onSuccess: data => {
      queryCache.setQueryData<ScopeDto[] | undefined>('scopes', scopes => {
        if (!scopes) return scopes;

        return scopes.filter(({ id }) => id !== data.id);
      });

      const archivedScopesQuery = queryCache.getQuery(['archivedScopes', true]);

      if (archivedScopesQuery) {
        queryCache.setQueryData<ScopeDto[] | undefined>(['archivedScopes', true], scopes => {
          if (!scopes) return scopes;

          return [...scopes, data];
        });
      }
    },

    onError: (err, newTodo, rollback) => {
      if (typeof rollback === 'function') {
        rollback();
      }

      Toaster.error({
        title: 'Oops, something went wrong',
      });
    },
  });
};
