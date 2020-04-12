import React from 'react';
import moment from 'moment';
import { BoardTopActions } from '../BoardTopActions/BoardTopActions';
import { BoardHeaderLoading } from './BoardHeader.loading';
import { StyledBoardHeader, BoardTitle, LargeText } from './BoardHeader.styles';
import { DayDto } from '../../api/useDay';

interface Props {
  status: 'loading' | 'error' | 'success';
  day?: DayDto;
}

export const BoardHeader: React.FC<Props> = ({ status, day }) => {
  const renderBoardTitle = () => {
    if (!day) {
      return null;
    }

    const { day: dayString } = day;

    return (
      <>
        <LargeText>{`${moment(dayString).format('ddd DD')}`} </LargeText>
        <span>{`${moment(dayString).format('MMM YYYY')}`}</span>
      </>
    );
  };

  if (status === 'error') {
    return null;
  }

  return (
    <StyledBoardHeader>
      {status === 'loading' && <BoardHeaderLoading />}
      {status === 'success' && (
        <>
          <BoardTitle>{renderBoardTitle()}</BoardTitle>
          <BoardTopActions />
        </>
      )}
    </StyledBoardHeader>
  );
};
