import React, { ButtonHTMLAttributes } from 'react';
import { IconButton } from '@binarycapsule/ui-capsules';
import { useHistory, useParams } from 'react-router-dom';
import { UserMenu } from '../../../userMenu/UserMenu';
import { StyledBoardTopActions } from './BoardTopActions.styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const BoardTopActions: React.FC<Props> = () => {
  const history = useHistory();
  const { dayId } = useParams();

  return (
    <StyledBoardTopActions>
      <IconButton
        text="Report"
        icon="survey"
        isRound
        hasBackground
        onClick={() => history.push(`/report/${dayId}`)}
      />
      <UserMenu />
    </StyledBoardTopActions>
  );
};
