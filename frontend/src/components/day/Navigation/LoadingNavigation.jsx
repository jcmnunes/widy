import React from 'react';
import styled from 'styled-components/macro';
import { LoadingMask } from '@binarycapsule/ui-capsules';

const StyledLoadingNavigation = styled.div`
  & > * {
    margin-bottom: 8px;
  }
`;

const LoadingNavigation = () => {
  return (
    <StyledLoadingNavigation>
      <LoadingMask width="100%" height="40px" />
      <LoadingMask width="100%" height="40px" />
      <LoadingMask width="100%" height="40px" />
      <LoadingMask width="100%" height="40px" />
    </StyledLoadingNavigation>
  );
};

export default LoadingNavigation;
