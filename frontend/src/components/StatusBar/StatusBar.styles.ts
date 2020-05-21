import styled from 'styled-components/macro';

export const StyledStatusBar = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  width: 14px;
  flex-shrink: 0;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`;
