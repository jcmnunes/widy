import styled from '@emotion/styled/macro';

export const StyledStatusBar = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  width: 14px;
  flex-shrink: 0;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpointsLegacy.mobile}) {
    display: block;
  }
`;
