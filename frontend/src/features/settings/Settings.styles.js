import styled from 'styled-components/macro';

export const PageWrapper = styled.div`
  margin-top: 48px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    margin-top: 0;
  }
`;
