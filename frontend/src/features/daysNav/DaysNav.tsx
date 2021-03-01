import React, { useCallback } from 'react';
import moment from 'moment';
import { IconButton } from '@binarycapsule/ui-capsules';
import { useDispatch, useSelector } from 'react-redux';
import { Brand } from './Brand/Brand';
import { DaysNavCloseButton, StyledDaysNav } from './DaysNav.styles';
import { DaysNavHeader } from './DaysNavHeader/DaysNavHeader';
import { DaysList } from './DaysList/DaysList';
import { DaysNavLoading } from './DaysNav.loading';
import { DaysNavError } from './DaysNav.error';
import { isDaysNavOpenSelector } from './DaysNav.selectors';
import { daysNavSliceActions } from './DaysNavSlice';
import { useDays } from './hooks/useDays';
import { useDaysQuery } from './api/useDaysQuery';

interface Props {}

export const DaysNav: React.FC<Props> = () => {
  const {
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useDaysQuery();

  const { data: days } = useDays();

  const today = moment().format('YYYY-MM-DD');

  const isTodayCreated = !!(days && days[0].day === today);

  const isDaysNavOpen = useSelector(isDaysNavOpenSelector);

  const dispatch = useDispatch();

  const closeDaysNav = useCallback(() => {
    dispatch(daysNavSliceActions.closeDaysNav());
  }, [dispatch]);

  return (
    <StyledDaysNav isOpen={isDaysNavOpen}>
      <DaysNavCloseButton>
        <IconButton
          onClick={() => {
            closeDaysNav();
          }}
          variant="ghost"
          variantColor="neutral"
          icon="x"
        />
      </DaysNavCloseButton>

      <Brand />

      <DaysNavHeader isTodayCreated={isTodayCreated} />

      {isLoading && <DaysNavLoading />}

      {isError && <DaysNavError />}

      {isSuccess && days && (
        <DaysList
          days={days}
          canFetchMore={hasNextPage}
          isFetchingMore={isFetchingNextPage}
          fetchMore={fetchNextPage}
        />
      )}
    </StyledDaysNav>
  );
};
