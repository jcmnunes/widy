import React from 'react';
import { Button } from '@binarycapsule/ui-capsules';
import { Heading1 } from '../../../components/Typography';
import { StyledDaysNavHeader } from './DaysNavHeader.styles';
import { useCreateDay } from '../../day/api/useCreateDay';

interface Props {
  isTodayCreated: boolean;
  showAddDayButton?: boolean;
}

export const DaysNavHeader: React.FC<Props> = ({ isTodayCreated, showAddDayButton = true }) => {
  const [createDay, { status }] = useCreateDay();

  return (
    <StyledDaysNavHeader>
      <Heading1>Days</Heading1>

      {showAddDayButton && (
        <Button
          leftIcon="plus"
          isLoading={status === 'loading'}
          disabled={status === 'loading' || isTodayCreated}
          onClick={() => createDay()}
        >
          Add Day
        </Button>
      )}
    </StyledDaysNavHeader>
  );
};
