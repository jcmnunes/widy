import styled from '@emotion/styled/macro';
import Editor from '@binarycapsule/editor';

export const Wrapper = styled.div`
  margin-bottom: 32px;
`;

export const StyledNotesEditor = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.neutral['300']};
  background: white;
  color: ${props => props.theme.colors.neutral['700']};
  margin-bottom: 2px;
  min-height: 250px;
`;

export const StyledEditor = styled(Editor)`
  padding: 0;
  height: 200px;
  overflow-y: auto;
  color: ${props => props.theme.colors.neutral['700']};

  h1,
  h2,
  h3 {
    color: ${props => props.theme.colors.neutral['700']};
  }
`;
