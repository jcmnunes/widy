import React, { useCallback } from 'react';
import moment from 'moment';
import { Button } from '@binarycapsule/ui-capsules';
import { useDispatch, useSelector } from 'react-redux';
import { Brand } from './Brand/Brand';
import { DaysNavCloseButton, StyledDaysNav } from './DaysNav.styles';
import { DaysNavHeader } from './DaysNavHeader/DaysNavHeader';
import { DaysList } from './DaysList/DaysList';
import { DaysNavLoading } from './DaysNav.loading';
import { DaysNavError } from './DaysNav.error';
import { isDaysNavOpenSelector } from './DaysNav.selectors';
import { daysNavSliceActions } from './DaysNavSlice';
import { useDays } from './api/useDays';

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
      {status === 'loading' && <DaysNavLoading />}
      {status === 'error' && <DaysNavError />}
      {status === 'success' && !!days && (
        <DaysList
          days={days}
          canFetchMore={canFetchMore}
          isFetchingMore={isFetchingMore}
          fetchMore={fetchMore}
        />
      )}
    </StyledDaysNav>
  );
};
