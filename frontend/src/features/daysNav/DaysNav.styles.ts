import styled from 'styled-components/macro';

export const StyledDaysNav = styled.div`
  background: ${props => props.theme.neutral050};
  padding: 36px 24px 24px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 254px;
  flex-shrink: 0;
`;

export const LoadMoreDays = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
`;
