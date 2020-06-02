import React from 'react';
import styled from 'styled-components/macro';
import { LoadingMask } from '@binarycapsule/ui-capsules';

const StyledDaysNavLoading = styled.div`
  & > * {
    margin-bottom: 8px;
  }
`;

interface Props {}

export const DaysNavLoading: React.FC<Props> = () => {
  return (
    <StyledDaysNavLoading>
      <LoadingMask width="100%" height="40px" />
      <LoadingMask width="100%" height="40px" />
      <LoadingMask width="100%" height="40px" />
      <LoadingMask width="100%" height="40px" />
    </StyledDaysNavLoading>
  );
};
