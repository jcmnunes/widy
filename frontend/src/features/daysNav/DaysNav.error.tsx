import React from 'react';
import { Icon } from '@binarycapsule/ui-capsules';
import styled from '@emotion/styled/macro';

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.red['700']};
  font-size: 13px;
  display: flex;
  flex-direction: row;
  align-items: center;

  > * {
    margin-right: 12px;
  }
`;

interface Props {}

export const DaysNavError: React.FC<Props> = () => {
  return (
    <ErrorText>
      <Icon icon="exclamation_c" /> Something went wrong...
    </ErrorText>
  );
};
