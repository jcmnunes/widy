import React, { useCallback } from 'react';
import moment from 'moment';
import { Button } from '@binarycapsule/ui-capsules';
import { useDispatch, useSelector } from 'react-redux';
import { Brand } from './Brand/Brand';
import { DaysNavCloseButton, LoadMoreDays, StyledDaysNav } from './DaysNav.styles';
import { DaysNavHeader } from './DaysNavHeader/DaysNavHeader';
import { DaysList } from './DaysList/DaysList';
import LoadingNavigation from '../../components/day/Navigation/LoadingNavigation';
import useDays from './api/useDays';
import { isDaysNavOpenSelector } from './DaysNav.selectors';
import { daysNavSliceActions } from './DaysNavSlice';

const ErrorState = () => <div>Something went wrong :/</div>;

interface Props {}

export const DaysNav: React.FC<Props> = () => {
  const { status, days, canFetchMore, fetchMore, isFetchingMore } = useDays();
  const today = moment().format('YYYY-MM-DD');
  const isTodayCreated = !!(days && days.find(({ day }) => day === today));

  const isDaysNavOpen = useSelector(isDaysNavOpenSelector);
  const dispatch = useDispatch();

  const closeDaysNav = useCallback(() => {
    dispatch(daysNavSliceActions.closeDaysNav());
  }, [dispatch]);

  return (
    <StyledDaysNav isOpen={isDaysNavOpen}>
      <DaysNavCloseButton>
        <Button onClick={closeDaysNav} appearance="minimal" iconBefore="x" />
      </DaysNavCloseButton>
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
