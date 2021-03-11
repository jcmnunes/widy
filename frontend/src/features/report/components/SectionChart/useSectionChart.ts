import { timePerSection, useReport } from '../../api/useReport';
import { useParams } from 'react-router-dom';
import { ReportRouteParams } from '../../Report.types';
import { useMemo } from 'react';
import { ComponentHookResult } from '../../../../typings/types';
import { theme } from '@binarycapsule/ui-capsules';

const SERIES_COLORS = [
  theme.colors.primary['100'],
  theme.colors.primary['200'],
  theme.colors.primary['300'],
  theme.colors.primary['400'],
  theme.colors.primary['500'],
  theme.colors.primary['600'],
  theme.colors.primary['700'],
  theme.colors.primary['800'],
  theme.colors.primary['900'],
];

type SectionChartData = {
  label: string;
  value: number;
  color: string;
  taskCount: number;
}[];

export const useSectionChart = (): ComponentHookResult<SectionChartData> => {
  const { dayId } = useParams<ReportRouteParams>();

  const queryResult = useReport(dayId);

  const data = useMemo(() => {
    if (!queryResult.data) {
      return null;
    }

    const { tasks } = queryResult.data;

    const sectionsTime = timePerSection(tasks);

    return Object.values(sectionsTime).map(({ title, time, taskCount }, index) => ({
      label: title,
      value: time,
      color: SERIES_COLORS[index % SERIES_COLORS.length],
      taskCount,
    }));
  }, [queryResult.data]);

  return {
    ...queryResult,
    data,
  };
};
