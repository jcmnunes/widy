import styled from '@emotion/styled/macro';

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
  background: ${props => props.theme.colors.neutral['50']};
`;

export const StyledForm = styled.form`
  width: 480px;
  background: white;
  border-radius: 12px;
  border: 2px solid ${props => props.theme.colors.neutral['300']};
  padding: 48px;
  margin-top: 48px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  width: 100%;
  color: ${props => props.theme.colors.neutral['700']};
  margin-bottom: 24px;
`;

export const Helper = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.neutral['400']};
  width: 90%;
  margin: 0 auto 24px;
  text-align: center;
`;

export const Footer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 48px;
  font-size: 18px;
`;

export const InputField = styled.label`
  margin-bottom: 16px;
  display: block;
  font-size: 14px;
  font-weight: 500;
`;
