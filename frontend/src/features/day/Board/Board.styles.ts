import styled from 'styled-components/macro';

export const StyledBoard = styled.div`
  flex: 1;
  position: relative;
  height: 100vh;
  overflow-y: auto;
  background: white;
  padding: 0 16px 24px;
  min-width: 340px;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 24px 32px;
  }

  @media (min-width: 800px) {
    padding: 0 32px 32px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 48px 48px;
  }
`;
