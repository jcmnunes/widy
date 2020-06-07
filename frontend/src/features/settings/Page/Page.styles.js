import styled from 'styled-components/macro';

export const StyledPage = styled.div`
  flex: 1;
  padding: 32px 16px;
  overflow-y: auto;
  position: relative;

  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 48px 32px;
  }
`;

export const ActionsTop = styled.div`
  position: absolute;
  top: 32px;
  right: 12px;

  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    top: 48px;
    right: 32px;
  }
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

export const MenuButton = styled.div`
  position: absolute;
  top: 32px;
  left: 8px;

  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    top: 48px;
    left: 24px;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;
