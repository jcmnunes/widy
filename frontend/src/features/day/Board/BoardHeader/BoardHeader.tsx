import React, { useCallback } from 'react';
import moment from 'moment';
import { Icon } from '@binarycapsule/ui-capsules';
import { useDispatch } from 'react-redux';
import { QueryStatus } from 'react-query';
import { BoardTopActions } from '../BoardTopActions/BoardTopActions';
import { BoardHeaderLoading } from './BoardHeader.loading';
import {
  BoardHeaderMobileActions,
  BoardTitle,
  BoardTitleContainer,
  BrandContainer,
  LargeText,
  StyledBoardHeader,
} from './BoardHeader.styles';
import { DayDto } from '../../api/useDay';
import { Brand } from '../../../daysNav/Brand/Brand';
import { daysNavSliceActions } from '../../../daysNav/DaysNavSlice';

interface Props {
  status: QueryStatus;
  day?: DayDto;
}

export const BoardHeader: React.FC<Props> = ({ status, day }) => {
  const dispatch = useDispatch();

  const openDaysNav = useCallback(() => {
    dispatch(daysNavSliceActions.openDaysNav());
  }, [dispatch]);

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
          <button type="button" onClick={openDaysNav}>
            <BoardTitleContainer>
              <BrandContainer>
                <Brand />
                <BoardHeaderMobileActions>
                  <Icon icon="chev_right" />
                </BoardHeaderMobileActions>
              </BrandContainer>
              <BoardTitle>{renderBoardTitle()}</BoardTitle>
            </BoardTitleContainer>
          </button>
          <BoardTopActions />
        </>
      )}
    </StyledBoardHeader>
  );
};
