import React, { ButtonHTMLAttributes } from 'react';
import { IconButton } from '@binarycapsule/ui-capsules';
import { useHistory, useParams } from 'react-router-dom';
import { UserMenu } from '../../../userMenu/UserMenu';
import { useDays } from '../../../daysNav/api/useDays';
import { StyledBoardTopActions } from './BoardTopActions.styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const BoardTopActions: React.FC<Props> = () => {
  const history = useHistory();
  const { dayId } = useParams();
  const { days, status: getDaysStatus } = useDays();

  return (
    <StyledBoardTopActions>
      {getDaysStatus === 'success' && days.length > 0 && (
        <IconButton
          text="Report"
          icon="survey"
          isRound
          hasBackground
          onClick={() => history.push(`/report/${dayId}`)}
        />
      )}
      <UserMenu />
    </StyledBoardTopActions>
  );
};
