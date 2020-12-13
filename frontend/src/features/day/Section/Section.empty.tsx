import React from 'react';
import styled from '@emotion/styled/macro';

const StyledSectionEmpty = styled.button<{
  isDraggingOver: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.neutral['100']};
  border-radius: 4px;
  height: 96px;
  background-color: ${({ isDraggingOver, theme }) =>
    isDraggingOver ? theme.colors.neutral['50'] : 'white'};
  transition: background-color 0.2s ease;
  font-size: 14px;
  color: ${props => props.theme.colors.neutral['300']};
  cursor: pointer;
  width: 100%;

  &:hover {
    background: ${props => props.theme.colors.neutral['50']};
  }
`;

interface Props {
  isPlan: boolean;
  isSchedule: boolean;
  isDraggingOver: boolean;
  title: string;
  onClick(): void;
}

export const SectionEmpty: React.FC<Props> = ({
  isPlan,
  isSchedule,
  isDraggingOver,
  title,
  onClick,
}) => {
  return (
    <StyledSectionEmpty isDraggingOver={isDraggingOver} onClick={onClick}>
      {isPlan && <span>No tasks in Plan.</span>}
      {isSchedule && <span>No scheduled tasks.</span>}

      {!isPlan &&
        !isSchedule &&
        (isDraggingOver ? (
          <span>Add task to section &quot;{title}&quot;</span>
        ) : (
          <span>No tasks &quot;{title}&quot;</span>
        ))}
    </StyledSectionEmpty>
  );
};
