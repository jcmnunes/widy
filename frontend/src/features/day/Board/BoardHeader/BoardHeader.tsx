import React from 'react';
import moment from 'moment';
import { Button } from '@binarycapsule/ui-capsules';
import { useDispatch } from 'react-redux';
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
  status: 'loading' | 'error' | 'success';
  day?: DayDto;
}

export const BoardHeader: React.FC<Props> = ({ status, day }) => {
  const dispatch = useDispatch();

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
          <BoardTitleContainer>
            <BrandContainer>
              <Brand />
              <BoardHeaderMobileActions>
                <Button
                  appearance="minimal"
                  iconBefore="chev_right"
                  onClick={() => dispatch(daysNavSliceActions.openDaysNav())}
                />
              </BoardHeaderMobileActions>
            </BrandContainer>
            <BoardTitle>{renderBoardTitle()}</BoardTitle>
          </BoardTitleContainer>
          <BoardTopActions />
        </>
      )}
    </StyledBoardHeader>
  );
};
