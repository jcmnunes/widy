import React from 'react';
import styled from 'styled-components/macro';

const StyledSectionEmpty = styled.button<{
  isDraggingOver: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.neutral100};
  border-radius: 4px;
  height: 96px;
  background-color: ${({ isDraggingOver, theme }) => (isDraggingOver ? theme.neutral050 : 'white')};
  transition: background-color 0.2s ease;
  font-size: 16px;
  color: ${props => props.theme.neutral300};
  cursor: pointer;
  width: 100%;

  &:hover {
    background: ${props => props.theme.neutral050};
  }
`;

interface Props {
  isPlan: boolean;
  isDraggingOver: boolean;
  title: string;
  onClick(): void;
}

export const SectionEmpty: React.FC<Props> = ({ isPlan, isDraggingOver, title, onClick }) => {
  return (
    <StyledSectionEmpty isDraggingOver={isDraggingOver} onClick={onClick}>
      {isPlan && <span>No tasks in Plan.</span>}

      {!isPlan &&
        (isDraggingOver ? (
          <span>Add task to section &quot;{title}&quot;</span>
        ) : (
          <span>No tasks in section &quot;{title}&quot;</span>
        ))}
    </StyledSectionEmpty>
  );
};
