import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton, Spinner } from '@binarycapsule/ui-capsules';
import TaskPerSectionChart from './TaskPerSectionChart/TaskPerSectionChart';
import UserDropdown from '../../../components/UserDropdown/UserDropdown';
import { formatTotalTime } from '../../../helpers/timeHelpers';
import { formatDay } from '../../../helpers/dates';
import { TasksTable } from './TasksTable/TasksTable';
import {
  ActionsContainer,
  ActionsTop,
  ChartsContainer,
  EmptyStateContainer,
  EmptyStateText,
  ReportDescription,
  ReportTitle,
  Stat,
  StatLabel,
  StatsContainer,
  StatValue,
  StyledReportPage,
  LoadingReport,
  SpinnerText,
  ReportLoader,
  ReportLoaderText,
} from './ReportPage.styles';
import {
  useReport,
  selectTasksTableData,
  selectTimePerSectionPieChartData,
} from '../api/useReport';
import { IllustrationBoss } from '../../../illustrations/IllustrationBoss';

interface Props {
  dayId: string;
}

export const ReportPage: React.FC<Props> = ({ dayId }) => {
  const { data: report, status, isFetching } = useReport(dayId);

  const history = useHistory();

  const timePerSectionPieChartData = useMemo(
    () => (report ? selectTimePerSectionPieChartData(report) : null),
    [report],
  );

  const tasksTableData = useMemo(() => (report ? selectTasksTableData(report) : null), [report]);

  return (
    <StyledReportPage>
      <ActionsTop>
        <div>
          <ReportTitle>Report</ReportTitle>
          {status === 'success' && report && (
            <ReportDescription>{formatDay(report.day)}</ReportDescription>
          )}
        </div>
        <ActionsContainer>
          <IconButton
            icon="logout"
            isRound
            onClick={() => history.push(`/day/${dayId}`)}
            text="Exit Report"
          />
          <UserDropdown />
        </ActionsContainer>
      </ActionsTop>
      {status === 'loading' ? (
        <LoadingReport>
          <SpinnerText>Getting report...</SpinnerText>
          <Spinner appearance="dark" size="large" />
        </LoadingReport>
      ) : (
        report && (
          <>
            <StatsContainer>
              {isFetching && (
                <ReportLoader>
                  <Spinner size="small" />
                  <ReportLoaderText>Updating...</ReportLoaderText>
                </ReportLoader>
              )}
              <Stat>
                <StatValue>{formatTotalTime(report.totalTime)}</StatValue>
                <StatLabel>Total time worked</StatLabel>
              </Stat>
              <Stat>
                <StatValue>{`${report.completedTasks} / ${report.totalTasks}`}</StatValue>
                <StatLabel>Tasks completed/total</StatLabel>
              </Stat>
            </StatsContainer>
            {report.totalTime === 0 ? (
              <EmptyStateContainer>
                <IllustrationBoss size={260} />
                <EmptyStateText>You have not tracked any time on this day</EmptyStateText>
              </EmptyStateContainer>
            ) : (
              <>
                {timePerSectionPieChartData && (
                  <ChartsContainer>
                    <TaskPerSectionChart data={timePerSectionPieChartData} />
                  </ChartsContainer>
                )}
                {report.totalTasks > 0 && tasksTableData && <TasksTable data={tasksTableData} />}
              </>
            )}
          </>
        )
      )}
    </StyledReportPage>
  );
};
