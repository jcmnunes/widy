import styled from 'styled-components/macro';

export const StyledBoardTopActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > * {
    margin-left: 6px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > * {
      margin-left: 12px;
    }
  }
`;
