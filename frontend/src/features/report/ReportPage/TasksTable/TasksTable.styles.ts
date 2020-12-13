import styled from '@emotion/styled/macro';
import { TableCell, TableRow } from '@binarycapsule/ui-capsules';

export const ScopeRow = styled(TableRow)`
  background: ${props => props.theme.colors.neutral['100']} !important;
  color: ${props => props.theme.colors.neutral['600']};
  font-weight: 700;
`;

export const TaskRow = styled(TableRow)`
  background: #fff !important;

  > td:first-child {
    padding-left: 32px;
  }
`;

export const IconTableCell = styled(TableCell)`
  svg {
    margin-top: 3px;
    margin-bottom: -3px;
  }
`;
