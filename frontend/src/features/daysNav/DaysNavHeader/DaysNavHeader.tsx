import React from 'react';
import { Button } from '@binarycapsule/ui-capsules';
import { Heading1 } from '../../../components/common/Typography';
import { StyledDaysNavHeader } from './DaysNavHeader.styles';
import { useCreateDay } from '../api/useCreateDay';

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
          appearance="primary"
          iconBefore="plus"
          isLoading={status === 'loading'}
          isDisabled={status === 'loading' || isTodayCreated}
          onClick={() => createDay()}
        >
          Add Day
        </Button>
      )}
    </StyledDaysNavHeader>
  );
};
