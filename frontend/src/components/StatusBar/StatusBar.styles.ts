import styled from 'styled-components/macro';

export const StyledStatusBar = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  width: 14px;
  flex-shrink: 0;
`;
