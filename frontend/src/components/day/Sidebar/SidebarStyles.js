import styled from 'styled-components/macro';

export const StyledSidebar = styled.div`
  background: ${props => props.theme.yellow050};
  padding: 32px;
  height: 100vh;
  overflow-y: auto;

  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    padding: 48px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;
`;

export const Title = styled.h2`
  font-size: 16px;
  color: ${props => props.theme.neutral300};
  margin-top: 24px;
`;

export const ScopeWrapper = styled.div`
  margin-bottom: 24px;
`;
