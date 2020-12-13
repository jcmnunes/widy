import styled from '@emotion/styled/macro';

export const PageWrapper = styled.div`
  margin-top: 48px;

  @media (min-width: ${props => props.theme.breakpointsLegacy.md}) {
    margin-top: 0;
  }
`;
