import styled from 'styled-components/macro';

export const StyledPage = styled.div`
  flex: 1;
  padding: 48px 32px;
  overflow-y: auto;
  position: relative;
`;

export const ActionsTop = styled.div`
  position: absolute;
  top: 48px;
  right: 32px;
`;

export const PageTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

export const PageDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.theme.neutral300};
`;

export const StyledForm = styled.form`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 32px;
  max-width: 256px;
  width: 100%;

  input {
    margin-top: 6px;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 32px;

  > * {
    margin-left: 12px;
  }
`;
