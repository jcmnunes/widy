import React from 'react';
import { LoadingMask } from '@binarycapsule/ui-capsules';
import times from 'lodash/times';
import { Row, StyledScopesTable } from './ScopesTable.styles';

interface Props {}

export const ScopesTableLoading: React.FC<Props> = () => {
  return (
    <StyledScopesTable>
      {times(10).map(el => (
        <Row key={el}>
          <LoadingMask height="12px" width="300px" />
        </Row>
      ))}
    </StyledScopesTable>
  );
};
