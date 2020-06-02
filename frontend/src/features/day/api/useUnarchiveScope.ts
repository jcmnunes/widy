import axios from 'axios';
import { queryCache, useMutation } from 'react-query';
import { Toaster } from '@binarycapsule/ui-capsules';
import { ScopeDto } from './useScopes';

const unarchiveScope = async (scopeId: string) => {
  const { data } = await axios.put<ScopeDto>(`/api/scopes/${scopeId}/unarchive`);
  return data;
};

export const useUnarchiveScope = () => {
  return useMutation(unarchiveScope, {
    onSuccess: data => {
      queryCache.setQueryData<ScopeDto[] | undefined>('scopes', scopes => {
        if (!scopes) return scopes;

        return [...scopes, data];
      });

      queryCache.setQueryData<ScopeDto[] | undefined>(['archivedScopes', true], scopes => {
        if (!scopes) return scopes;

        return scopes.filter(({ id }) => id !== data.id);
      });
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
