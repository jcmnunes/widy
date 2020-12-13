import styled from '@emotion/styled/macro';

export const StyledTime = styled.span`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-left: 12px;
`;

export const Values = styled.span<{ size: 'sm' | 'md' }>`
  display: inline-block;
  font-size: ${({ size }) => (size === 'sm' ? '14px' : '20px')};
  margin-right: ${({ size }) => (size === 'sm' ? '2px' : '4px')};
`;

export const Units = styled.span<{ size: 'sm' | 'md' }>`
  display: inline-block;
  font-size: ${({ size }) => (size === 'sm' ? '10px' : '12px')};
  margin-right: ${({ size }) => (size === 'sm' ? '4px' : '8px')};
`;
