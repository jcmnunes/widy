import React from 'react';
import { IllustratedIcon } from '@binarycapsule/ui-capsules';
import { StyledDayButton, Content } from './DayButton.styles';
import Badge from '../../../../components/common/Badge/Badge';

interface Props {
  isSelected: boolean;
  isToday: boolean;
  onClick(): void;
}

export const DayButton: React.FC<Props> = ({ isSelected, isToday, onClick, children }) => {
  return (
    <StyledDayButton isSelected={isSelected} onClick={onClick}>
      <Content>
        {isToday && <Badge>Today</Badge>}
        <span>{children}</span>
      </Content>
      <IllustratedIcon icon="chev_right" />
    </StyledDayButton>
  );
};
