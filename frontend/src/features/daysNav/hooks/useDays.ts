import { useMemo } from 'react';
import { DayDto, useDaysQuery } from '../api/useDaysQuery';
import { ComponentHookResult } from '../../../typings/types';

export const useDays = (): ComponentHookResult<DayDto[]> => {
  const queryInfo = useDaysQuery();

  const data = useMemo(() => {
    if (!queryInfo.data) {
      return null;
    }

    const { pages } = queryInfo.data;

    const nestedDays = pages.map(({ days }) => days);

    return nestedDays.flat();
  }, [queryInfo.data]);

  return {
    ...queryInfo,
    data,
  };
};
