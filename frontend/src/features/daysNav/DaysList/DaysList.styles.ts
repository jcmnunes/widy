import styled from 'styled-components/macro';

export const StyledDaysList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  overflow: auto;

  & > * + * {
    margin-top: 8px;
  }
`;
