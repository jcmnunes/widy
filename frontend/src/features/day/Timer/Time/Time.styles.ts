import styled from 'styled-components/macro';

export const StyledTime = styled.span`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-left: 12px;
`;

export const Values = styled.span<{ size: 'sm' | 'md' }>`
  display: inline-block;
  font-size: ${({ size }) => (size === 'sm' ? '16px' : '22px')};
  margin-right: ${({ size }) => (size === 'sm' ? '2px' : '4px')};
`;

export const Units = styled.span<{ size: 'sm' | 'md' }>`
  display: inline-block;
  font-size: ${({ size }) => (size === 'sm' ? '12px' : '14px')};
  margin-right: ${({ size }) => (size === 'sm' ? '4px' : '8px')};
`;
