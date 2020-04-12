import axios from 'axios';
import { queryCache, useMutation } from 'react-query';
import { produce } from 'immer';
import { Toaster } from '@binarycapsule/ui-capsules';
import { ScopeDto } from './useScopes';

interface UpsertScopeBody {
  name: string;
  shortCode: string;
}

interface CreateScopeVariables extends UpsertScopeBody {
  id?: string;
}

const upsertScope = async ({ name, shortCode, id }: CreateScopeVariables) => {
  const body: UpsertScopeBody = {
    name,
    shortCode,
  };

  if (id) {
    const { data } = await axios.put<ScopeDto>(`/api/scopes/${id}`, body);
    return data;
  }

  const { data } = await axios.post<ScopeDto>('/api/scopes', body);
  return data;
};

export const useUpsertScope = () => {
  return useMutation(upsertScope, {
    onSuccess: data => {
      queryCache.setQueryData<ScopeDto[] | undefined>('scopes', scopes => {
        if (!scopes) return scopes;

        const scopeIndex = scopes.findIndex(({ id }) => id === data.id);

        if (scopeIndex > -1) {
          return produce(scopes, draftState => {
            draftState[scopeIndex] = data;
          });
        }

        return produce(scopes, draftState => {
          draftState.push(data);
        });
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
