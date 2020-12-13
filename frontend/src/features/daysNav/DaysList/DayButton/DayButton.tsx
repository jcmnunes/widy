import React from 'react';
import { Icon } from '@binarycapsule/ui-capsules';
import { Content, StyledDayButton } from './DayButton.styles';
import Badge from '../../../../components/Badge/Badge';

interface Props {
  isSelected: boolean;
  isToday: boolean;
  onClick(): void;
}

export const DayButton: React.FC<Props> = ({ isSelected, isToday, onClick, children }) => {
  return (
    <StyledDayButton isSelected={isSelected} onClick={onClick}>
      <Content isToday={isToday}>
        {isToday && <Badge>Today</Badge>}
        <span>{children}</span>
      </Content>

      <Icon icon="chev_right" size="16px" />
    </StyledDayButton>
  );
};
