import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { Button } from '@binarycapsule/ui-capsules';
import moment from 'moment';
import Day from '../Day';
import { isToday } from '../../../../helpers/dates';
import {
  daysNextPageSelector,
  isLoadingMoreDaysSelector,
} from '../../../../selectors/days/daysSelectors';

const StyledDays = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;
  overflow: auto;
  flex: 1;
  padding: 4px;
  grid-auto-rows: minmax(min-content, max-content);
`;

const LoadMoreDays = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
`;

const Days = ({ days, order, selected, isSmall, handleDayClick, getMoreDays }) => {
  const nextPage = useSelector(daysNextPageSelector);
  const isLoadingMoreDays = useSelector(isLoadingMoreDaysSelector);

  return (
    <StyledDays>
      {order.map(id => (
        <Day
          key={id}
          onClick={() => handleDayClick(id)}
          selected={id === selected}
          isSmall={isSmall}
          isToday={isToday(days[id].day)}
        >
          {isSmall
            ? moment(days[id].day).format('MMM DD')
            : moment(days[id].day).format('ddd DD MMM YYYY')}
        </Day>
      ))}
      {nextPage && (
        <LoadMoreDays>
          <Button
            onClick={() => getMoreDays(nextPage)}
            appearance="minimal"
            size="small"
            isLoading={isLoadingMoreDays}
          >
            Load more days
          </Button>
        </LoadMoreDays>
      )}
    </StyledDays>
  );
};

Days.propTypes = {
  days: PropTypes.shape({
    [PropTypes.string]: PropTypes.object,
  }).isRequired,
  order: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  handleDayClick: PropTypes.func.isRequired,
  isSmall: PropTypes.bool.isRequired,
  getMoreDays: PropTypes.func.isRequired,
};

export default Days;
