import React from 'react';
import styled from 'styled-components/macro';
import { LoadingMask } from '@binarycapsule/ui-capsules';

const StyledPomodoroLoading = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;

  > * {
    margin-bottom: 32px;
  }
`;

const PomodoroLoading = () => {
  return (
    <StyledPomodoroLoading>
      <LoadingMask height="48px" width="256px" />
      <LoadingMask height="48px" width="256px" />
      <LoadingMask height="48px" width="256px" />
      <LoadingMask height="48px" width="256px" />
    </StyledPomodoroLoading>
  );
};

export default PomodoroLoading;
