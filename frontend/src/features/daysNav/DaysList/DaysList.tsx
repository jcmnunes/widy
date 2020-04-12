import React from 'react';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';
import { StyledDaysList } from './DaysList.styles';
import { DayButton } from './DayButton/DayButton';
import { isToday } from '../../../helpers/dates';
import { DayDto } from '../api/useDays';

interface Props {
  days: DayDto[];
}

export const DaysList: React.FC<Props> = ({ days }) => {
  const { dayId } = useParams();
  const history = useHistory();

  const onDayClick = (id: string) => {
    history.push(`/day/${id}`);
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
    </StyledDaysList>
  );
};
