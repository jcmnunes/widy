import React from 'react';
import styled from '@emotion/styled/macro';
import MarkdownLogo from './MarkdownLogo';

const Wrapper = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props => props.theme.colors.neutral['400']};
  font-size: 13px;
  margin-left: 8px;

  &:hover {
    color: ${props => props.theme.colors.neutral['700']};
  }
`;

export const Text = styled.span`
  margin-left: 6px;
`;

const MarkdownInstructions = () => {
  return (
    <Wrapper
      href="https://support.1password.com/markdown/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <MarkdownLogo />
      <Text>Markdown shortcuts are supported.</Text>
    </Wrapper>
  );
};

export default MarkdownInstructions;
