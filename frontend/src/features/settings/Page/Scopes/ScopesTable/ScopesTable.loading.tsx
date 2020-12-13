import React from 'react';
import { Skeleton } from '@binarycapsule/ui-capsules';
import times from 'lodash/times';
import { Row, StyledScopesTable } from './ScopesTable.styles';

export const ScopesTableLoading: React.FC = () => {
  return (
    <StyledScopesTable>
      {times(10).map(key => (
        <Row key={key}>
          <Skeleton height="12px" width="300px" circular />

          <Skeleton width="24px" height="24px" />
        </Row>
      ))}
    </StyledScopesTable>
  );
};
