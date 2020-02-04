import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import moment from 'moment';
import styled from 'styled-components/macro';
import { getDays } from '../../Report.actions';
import { daysLoadingSelector, daysSelector } from '../../Report.selectors';
import Day from '../../../day/Navigation/Day';
import LoadingNavigation from '../../../day/Navigation/LoadingNavigation';
import { isToday } from '../../../../helpers/dates';

export const StyledDays = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;
  overflow: auto;
  flex: 1;
  padding: 4px;
  grid-auto-rows: minmax(min-content, max-content);
`;

const Days = () => {
  const daysLoading = useSelector(daysLoadingSelector);
  const days = useSelector(daysSelector);

  const { dayId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDays());
  }, [dispatch]);

  return daysLoading ? (
    <LoadingNavigation />
  ) : (
    <StyledDays>
      {days.map(({ id, day }) => (
        <Day
          key={id}
          onClick={() => history.push(`/report/${id}`)}
          selected={id === dayId}
          isSmall={false}
          isToday={isToday(day)}
        >
          {moment(day).format('ddd DD MMM YYYY')}
        </Day>
      ))}
    </StyledDays>
  );
};

export default Days;
