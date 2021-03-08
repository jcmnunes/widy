import styled from '@emotion/styled/macro';
import { Box } from '@binarycapsule/ui-capsules';

export const ChartWrapper = styled(Box)`
  border-radius: 12px;
  border: ${({ theme }) => `1px solid ${theme.colors.neutral['200']}`};
`;

export const HeadCell = styled.th`
  height: 38px;
  vertical-align: middle;
  padding: 0 18px;
  text-align: left;
  white-space: initial;
  border-top: ${({ theme }) => `1px solid ${theme.colors.neutral['200']}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.neutral['200']}`};
`;

export const Cell = styled.td`
  height: 38px;
  vertical-align: middle;
  padding: 0 18px;
  text-align: left;
  white-space: initial;
`;
