import React, { ButtonHTMLAttributes, useCallback } from 'react';
import useMedia from 'react-use/lib/useMedia';
import { Button, IconButton } from '@binarycapsule/ui-capsules';
import { useHistory, useParams } from 'react-router-dom';
import { UserMenu } from '../../../userMenu/UserMenu';
import { useDays } from '../../../daysNav/api/useDays';
import { StyledBoardTopActions } from './BoardTopActions.styles';
import { DayRouteParams } from '../../dayTypes';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const BoardTopActions: React.FC<Props> = () => {
  const history = useHistory();

  const { dayId } = useParams<DayRouteParams>();

  const { days, status: getDaysStatus } = useDays();

  const isWide = useMedia('(min-width: 450px)');

  const goToReport = useCallback(() => {
    history.push(`/report/${dayId}`);
  }, [dayId, history]);

  return (
    <StyledBoardTopActions>
      {getDaysStatus === 'success' &&
        days.length > 0 &&
        (isWide ? (
          <Button
            leftIcon="chart_pie"
            iconVariant="outline"
            variant="ghost"
            variantColor="neutral"
            onClick={goToReport}
          >
            Report
          </Button>
        ) : (
          <IconButton
            icon="chart_pie"
            variant="ghost"
            variantColor="neutral"
            onClick={goToReport}
          />
        ))}
      <UserMenu />
    </StyledBoardTopActions>
  );
};
