import React from 'react';
import { Icon } from '@binarycapsule/ui-capsules';
import styled from 'styled-components/macro';

const ErrorText = styled.div`
  color: ${({ theme }) => theme.red700};
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
