import styled from 'styled-components/macro';

export const FormContainer = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-gap: 48px;
  align-content: center;
  justify-items: start;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 30px;
  color: ${props => props.theme.neutral700};
  margin-bottom: 32px;
`;

export const Footer = styled.div`
  width: 100%;
  text-align: center;
  font-size: 18px;
`;

export const InputField = styled.label`
  display: block;
  margin-bottom: 16px;
  font-size: 18px;
`;
