import styled from '@emotion/styled/macro';

export const StyledDayButton = styled.button<{ isSelected: boolean }>`
  height: 42px;
  border-radius: 4px;
  border: ${({ isSelected, theme }) =>
    isSelected
      ? `1px solid ${theme.colors.blue['700']}`
      : `1px solid ${theme.colors.neutral['100']}`};
  background: ${({ isSelected, theme }) => (isSelected ? theme.colors.blue['50'] : 'white')};
  font-size: 13px;
  font-weight: 500;
  color: ${props => props.theme.colors.neutral['700']};
  padding: 0 8px 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    border: 1px solid ${props => props.theme.colors.blue['700']};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px ${props => props.theme.colors.blue['100']};
  }
`;

export const Content = styled.div<{ isToday: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: ${({ isToday }) => isToday && '4px'};
`;
