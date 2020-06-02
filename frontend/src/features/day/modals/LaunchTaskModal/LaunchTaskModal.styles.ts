import styled from 'styled-components/macro';

export const Radios = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 12px;
  }
`;

export const Error = styled.div`
  color: ${props => props.theme.red400};
  font-size: 14px;
  padding: 6px;
`;
