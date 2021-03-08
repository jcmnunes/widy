import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Spinner } from '@binarycapsule/ui-capsules';
import UserDropdown from '../../../components/UserDropdown/UserDropdown';
import { formatTotalTime } from '../../../helpers/timeHelpers';
import { formatDay } from '../../../helpers/dates';
import { TasksTable } from './TasksTable/TasksTable';
import {
  ActionsContainer,
  ActionsTop,
  EmptyStateContainer,
  EmptyStateText,
  LoadingReport,
  ReportDescription,
  ReportLoader,
  ReportLoaderText,
  ReportTitle,
  ReportTitleContainer,
  SpinnerText,
  Stat,
  StatLabel,
  StatsContainer,
  StatValue,
  StyledReportPage,
} from './ReportPage.styles';
import { selectTasksTableData, useReport } from '../api/useReport';
import { IllustrationBoss } from '../../../illustrations/IllustrationBoss';
import { SectionChart } from '../components/SectionChart/SectionChart';

interface Props {
  dayId: string;
}

export const ReportPage: React.FC<Props> = ({ dayId }) => {
  const { data: report, status, isFetching } = useReport(dayId);

  const history = useHistory();

  const tasksTableData = useMemo(() => (report ? selectTasksTableData(report) : null), [report]);

  return (
    <StyledReportPage>
      <ActionsTop>
        <ReportTitleContainer>
          <ReportTitle>Report</ReportTitle>
          {status === 'success' && report && (
            <ReportDescription>{formatDay(report.day)}</ReportDescription>
          )}
        </ReportTitleContainer>
        <ActionsContainer>
          <Button
            leftIcon="logout"
            variant="ghost"
            variantColor="neutral"
            iconVariant="outline"
            onClick={() => history.push(`/day/${dayId}`)}
          >
            Exit
          </Button>

          <UserDropdown />
        </ActionsContainer>
      </ActionsTop>

      {status === 'loading' ? (
        <LoadingReport>
          <SpinnerText>Getting report...</SpinnerText>
          <Spinner variantColor="neutral" size="large" />
        </LoadingReport>
      ) : (
        report && (
          <>
            <StatsContainer>
              {isFetching && (
                <ReportLoader>
                  <Spinner size="small" variantColor="neutral" />
                  <ReportLoaderText>Loading...</ReportLoaderText>
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
                <SectionChart my="32" />

                {report.totalTasks > 0 && tasksTableData && <TasksTable data={tasksTableData} />}
              </>
            )}
          </>
        )
      )}
    </StyledReportPage>
  );
};
