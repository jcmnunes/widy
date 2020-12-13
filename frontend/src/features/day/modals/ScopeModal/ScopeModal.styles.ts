import styled from '@emotion/styled/macro';

export const InputField = styled.label`
  display: block;
  margin-bottom: 16px;
  font-size: 14px;
`;

export const ShortCodeLabel = styled.div`
  line-height: 18px;
`;

export const ShortCodeHelper = styled.div`
  color: ${props => props.theme.colors.neutral['300']};
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 4px;
`;

export const ShortCodeWrapper = styled.div`
  width: 128px;
`;
