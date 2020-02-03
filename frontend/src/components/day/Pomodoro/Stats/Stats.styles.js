import styled from 'styled-components/macro';

export const StyledStats = styled.table`
  margin-top: 16px;
`;

export const Td = styled.td`
  padding: 8px 8px 8px 0;
  vertical-align: middle;
`;

export const Value = styled.span`
  font-size: 22px;
  margin-right: 4px;
`;

export const Units = styled.span`
  font-size: 14px;
  margin-right: 8px;
`;

export const Pomodoros = styled.div`
  display: flex;
  flex-direction: row;

  > * {
    margin-right: 4px;
  }
`;

export const Empty = styled.span`
  font-style: italic;
  color: ${props => props.theme.neutral300};
`;

export const Multiplier = styled.span`
  font-size: 14px;
`;
