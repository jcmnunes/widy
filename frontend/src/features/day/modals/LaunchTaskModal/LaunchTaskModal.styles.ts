import styled from '@emotion/styled/macro';

export const Radios = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 12px;
  }
`;

export const Error = styled.div`
  color: ${props => props.theme.colors.error['400']};
  font-size: 14px;
  padding: 6px;
`;
