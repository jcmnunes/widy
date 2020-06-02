import { AxiosError } from 'axios';

export const queryConfig = {
  refetchAllOnWindowFocus: false,
  suspense: false,
  staleTime: Infinity,
  retry: (failureCount: number, error: unknown) => {
    if ((error as AxiosError).response) {
      switch ((error as AxiosError).response?.status) {
        case 404:
          return false;
        default:
      }
    }

    return failureCount <= 3;
  },
};
