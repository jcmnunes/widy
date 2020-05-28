import styled from 'styled-components/macro';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.neutral050};
`;

export const StyledForm = styled.form`
  width: 480px;
  background: white;
  border-radius: 12px;
  border: 2px solid ${props => props.theme.neutral300};
  padding: 48px;
  margin-top: 48px;
`;

export const Title = styled.h1`
  font-size: 30px;
  text-align: center;
  width: 100%;
  color: ${props => props.theme.neutral700};
  margin-bottom: 24px;
`;

export const Helper = styled.p`
  font-size: 18px;
  color: ${props => props.theme.neutral400};
  width: 90%;
  text-align: center;
  margin: 0 auto 24px;
`;

export const Footer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 48px;
`;

export const InputField = styled.label`
  margin-bottom: 16px;
  display: block;
  font-size: 18px;
`;
