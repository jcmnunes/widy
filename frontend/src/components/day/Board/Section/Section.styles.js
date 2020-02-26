import styled from 'styled-components/macro';

export const StyledSection = styled.div`
  margin: 32px 0;
`;

export const SectionWithNoTasks = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.theme.neutral100};
  border-radius: 4px;
  height: ${props => (props.isPlan && props.noTasks ? '275px' : '96px')};
  background-color: ${props => (props.isDraggingOver ? props.theme.neutral050 : 'white')};
  transition: background-color 0.2s ease;
  font-size: 16px;
  color: ${props => props.theme.neutral300};
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.neutral050};
  }
`;

export const Tasks = styled.div`
  display: flex;
  flex-direction: column;
`;
