import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { Button } from '@binarycapsule/ui-capsules';
import { StyledDaysList } from './DaysList.styles';
import { DayButton } from './DayButton/DayButton';
import { isToday } from '../../../helpers/dates';
import { DayDto } from '../api/useDaysQuery';
import { daysNavSliceActions } from '../DaysNavSlice';
import { LoadMoreDays } from '../DaysNav.styles';
import { DayRouteParams } from '../../day/dayTypes';

interface Props {
  days: DayDto[];
  canFetchMore?: boolean;
  isFetchingMore?: boolean;
  fetchMore(): void;
}

export const DaysList: React.FC<Props> = ({ days, canFetchMore, isFetchingMore, fetchMore }) => {
  const { dayId } = useParams<DayRouteParams>();

  const history = useHistory();

  const dispatch = useDispatch();

  const reportMatch = useRouteMatch('/report/:dayId');

  const onDayClick = (id: string) => {
    history.push(reportMatch ? `/report/${id}` : `/day/${id}`);
    dispatch(daysNavSliceActions.closeDaysNav());
  };

  return (
    <StyledDaysList>
      {days.map(({ id, day }) => (
        <DayButton
          key={id}
          isSelected={dayId === id}
          isToday={isToday(day)}
          onClick={() => onDayClick(id)}
        >
          {moment(day).format('ddd DD MMM YYYY')}
        </DayButton>
      ))}

      {canFetchMore && (
        <LoadMoreDays>
          <Button
            variant="ghost"
            variantColor="neutral"
            size="small"
            isLoading={!!isFetchingMore}
            onClick={() => fetchMore()}
          >
            Load more days
          </Button>
        </LoadMoreDays>
      )}
    </StyledDaysList>
  );
};
