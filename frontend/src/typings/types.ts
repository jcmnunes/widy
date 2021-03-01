export type SelectOption<T> = {
  label: string;
  value: T;
};

interface ComponentHookResultBase<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isIdle: boolean;
  isError: boolean;
  isFetching: boolean;
  refetch(): void;
  fetchNextPage?(): void;
}

type WithActions<T, U> = U extends object ? T & { actions: U } : T;

export type ComponentHookResult<T, U = undefined> = WithActions<ComponentHookResultBase<T>, U>;
