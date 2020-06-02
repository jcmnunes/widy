import styled from 'styled-components/macro';
import { TableRow } from '@binarycapsule/ui-capsules';

export const ScopeRow = styled(TableRow)`
  background: ${props => props.theme.neutral100} !important;
  color: ${props => props.theme.neutral600};
  font-weight: 700;
`;

export const TaskRow = styled(TableRow)`
  background: #fff !important;

  > td:first-child {
    padding-left: 32px;
  }
`;
