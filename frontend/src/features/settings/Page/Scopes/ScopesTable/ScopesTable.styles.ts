import styled from '@emotion/styled/macro';

export const StyledScopesTable = styled.div`
  border: 1px solid ${props => props.theme.colors.neutral['200']};
  border-radius: 4px;
  margin-top: 24px;
`;

export const ScopeName = styled.span`
  display: inline-block;
  font-size: 14px;
  flex: 1;
  margin: 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
  padding: 0 24px;
  cursor: pointer;
  justify-content: space-between;

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:nth-child(odd) {
    background: #fff;
  }

  &:nth-child(even) {
    background: ${props => props.theme.colors.neutral['50']};
  }
`;
