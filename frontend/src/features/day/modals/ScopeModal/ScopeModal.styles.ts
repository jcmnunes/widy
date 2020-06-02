import styled from 'styled-components/macro';

export const InputField = styled.label`
  display: block;
  margin-bottom: 16px;
  font-size: 16px;
`;

export const ShortCodeLabel = styled.div`
  line-height: 18px;
`;

export const ShortCodeHelper = styled.div`
  color: ${props => props.theme.neutral300};
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 4px;
`;

export const ShortCodeWrapper = styled.div`
  width: 128px;
`;
