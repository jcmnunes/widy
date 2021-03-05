import React from 'react';
import { Button } from '@binarycapsule/ui-capsules';
import { Heading1 } from '../../../components/Typography';
import { StyledDaysNavHeader } from './DaysNavHeader.styles';
import { useCreateDayMutation } from '../../day/api/useCreateDayMutation';

interface Props {
  isTodayCreated: boolean;
  showAddDayButton?: boolean;
}

export const DaysNavHeader: React.FC<Props> = ({ isTodayCreated, showAddDayButton = true }) => {
  const { mutate: createDay, isLoading } = useCreateDayMutation();

  return (
    <StyledDaysNavHeader>
      <Heading1>Days</Heading1>

      {showAddDayButton && (
        <Button
          leftIcon="plus"
          isLoading={isLoading}
          disabled={isLoading || isTodayCreated}
          onClick={() => createDay()}
        >
          Add Day
        </Button>
      )}
    </StyledDaysNavHeader>
  );
};
