import styled from 'styled-components/macro';

export const StyledPomodoro = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
`;

export const Time = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-left: 8px;
  font-size: 24px;
  color: ${props => props.theme.neutral700};
`;

export const Units = styled.div`
  font-size: 16px;
  margin-left: 4px;
`;
