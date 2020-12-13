import styled from '@emotion/styled/macro';

export const StyledBoardTopActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > * {
    margin-left: 6px;
  }

  @media (min-width: ${({ theme }) => theme.breakpointsLegacy.mobile}) {
    > * {
      margin-left: 12px;
    }
  }
`;
