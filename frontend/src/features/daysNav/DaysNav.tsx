import React from 'react';
import moment from 'moment';
import { Button } from '@binarycapsule/ui-capsules';
import { Brand } from './Brand/Brand';
import { StyledDaysNav, LoadMoreDays } from './DaysNav.styles';
import { DaysNavHeader } from './DaysNavHeader/DaysNavHeader';
import { DaysList } from './DaysList/DaysList';
import LoadingNavigation from '../../components/day/Navigation/LoadingNavigation';
import useDays from './api/useDays';

const ErrorState = () => <div>Something went wrong :/</div>;

interface Props {}

export const DaysNav: React.FC<Props> = () => {
  const { status, days, canFetchMore, fetchMore, isFetchingMore } = useDays();
  const today = moment().format('YYYY-MM-DD');
  const isTodayCreated = !!(days && days.find(({ day }) => day === today));

  return (
    <StyledDaysNav>
      <Brand />
      <DaysNavHeader isTodayCreated={isTodayCreated} />
      {status === 'loading' && <LoadingNavigation />}
      {status === 'error' && <ErrorState />}
      {status === 'success' && !!days && <DaysList days={days} />}
      {canFetchMore && (
        <LoadMoreDays>
          <Button
            onClick={() => fetchMore()}
            appearance="minimal"
            size="small"
            isLoading={isFetchingMore}
          >
            Load more days
          </Button>
        </LoadMoreDays>
      )}
    </StyledDaysNav>
  );
};
