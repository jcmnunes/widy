import styled from 'styled-components/macro';

export const StyledDayButton = styled.button<{ isSelected: boolean }>`
  height: 42px;
  border-radius: 4px;
  border: ${({ isSelected, theme }) =>
    isSelected ? `1px solid ${theme.blue700}` : `1px solid ${theme.neutral100}`};
  background: ${({ isSelected, theme }) => (isSelected ? theme.blue050 : 'white')};
  font-size: 14px;
  color: ${props => props.theme.neutral700};
  padding: 0 8px 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    border: 1px solid ${props => props.theme.blue700};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px ${props => props.theme.blue100};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 4px;
`;
