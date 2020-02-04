import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import moment from 'moment';
import Day from '../Day';
import { isToday } from '../../../../helpers/dates';

const StyledDays = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;
  overflow: auto;
  flex: 1;
  padding: 4px;
  grid-auto-rows: minmax(min-content, max-content);
`;

const Days = ({ days, order, selected, isSmall, handleDayClick }) => (
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
  </StyledDays>
);

Days.propTypes = {
  days: PropTypes.shape({
    [PropTypes.string]: PropTypes.object,
  }).isRequired,
  order: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  handleDayClick: PropTypes.func.isRequired,
  isSmall: PropTypes.bool.isRequired,
};

export default Days;
